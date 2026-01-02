import * as Tone from 'tone'
import { AUDIO_CONFIG } from '../../config/constants'

/**
 * 专业音频引擎
 * 负责所有音频处理、效果链管理和实时分析
 */
class AudioEngine {
  constructor() {
    this.audioContext = null
    this.masterOutput = null
    this.inputStream = null
    this.analyser = null
    this.effectsChain = {}
    this.isInitialized = false
    this.isRecording = false
    
    // 音频节点池
    this.nodes = {
      input: null,
      recorder: null,
      pitchDetector: null,
      harmonyGenerator: null,
      effects: {},
      output: null
    }
    
    // 状态
    this.state = {
      volume: 0.7,
      isMuted: false,
      currentEffect: null,
      magicMode: false
    }
    
    // 音频数据缓存
    this.audioData = {
      waveform: new Float32Array(AUDIO_CONFIG.FFT_SIZE / 2),
      spectrum: new Uint8Array(AUDIO_CONFIG.FFT_SIZE / 2),
      pitch: 0,
      confidence: 0,
      harmonyVoices: []
    }
  }
  
  /**
   * 初始化音频引擎
   */
  async initialize() {
    try {
      // 等待用户交互（浏览器安全策略）
      await Tone.start()
      
      // 创建音频上下文
      this.audioContext = Tone.getContext().rawContext
      
      // 创建主输出链
      this.masterOutput = new Tone.Volume(this.state.volume).toDestination()
      
      // 创建分析器
      this.analyser = new Tone.Analyser('waveform', AUDIO_CONFIG.FFT_SIZE)
      this.analyser.smoothing = AUDIO_CONFIG.SMOOTHING_TIME
      
      // 初始化效果链
      await this.initializeEffects()
      
      // 创建录音器
      this.recorder = new Tone.Recorder()
      
      this.isInitialized = true
      console.log('✅ 音频引擎初始化完成')
      
      return true
    } catch (error) {
      console.error('❌ 音频引擎初始化失败:', error)
      return false
    }
  }
  
  /**
   * 初始化效果处理器
   */
  async initializeEffects() {
    // 美化效果（用户可达目标）
    this.effectsChain.beautify = new Tone.Chain(
      new Tone.AutoPanner().start(),
      new Tone.AutoFilter().start(),
      new Tone.Chorus(4, 2.5, 0.5).start(),
      new Tone.Reverb({
        decay: 2.5,
        preDelay: 0.01,
        wet: AUDIO_CONFIG.BEAUTIFY.REVERB_WET
      }).generate(),
      new Tone.FeedbackDelay({
        delayTime: '8n',
        feedback: AUDIO_CONFIG.BEAUTIFY.DELAY_FEEDBACK,
        wet: 0.3
      }),
      this.masterOutput
    )
    
    // 魔法效果（理想夸张效果）
    this.effectsChain.magic = new Tone.Chain(
      new Tone.AutoPanner(0.5).start(),
      new Tone.AutoFilter({
        frequency: '4n',
        baseFrequency: 200,
        octaves: 4
      }).start(),
      new Tone.Chorus(6, 3.5, 0.8).start(),
      new Tone.Reverb({
        decay: 4,
        preDelay: 0.02,
        wet: AUDIO_CONFIG.MAGIC.REVERB_WET
      }).generate(),
      new Tone.FeedbackDelay({
        delayTime: '4n',
        feedback: AUDIO_CONFIG.MAGIC.DELAY_FEEDBACK,
        wet: 0.5
      }),
      new Tone.Compressor({
        ratio: AUDIO_CONFIG.MAGIC.COMPRESSION_RATIO,
        threshold: -24,
        attack: 0.003,
        release: 0.25
      }),
      this.masterOutput
    )
    
    // 干声通道（无效果）
    this.effectsChain.dry = this.masterOutput
    
    // 设置当前效果
    this.state.currentEffect = 'beautify'
  }
  
  /**
   * 获取用户麦克风输入
   */
  async getUserMicrophone() {
    try {
      if (!this.isInitialized) {
        await this.initialize()
      }
      
      // 请求麦克风权限
      this.inputStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          channelCount: 1,
          sampleRate: AUDIO_CONFIG.SAMPLE_RATE
        }
      })
      
      // 创建输入节点
      this.nodes.input = new Tone.UserMedia()
      await this.nodes.input.open(this.inputStream)
      
      // 连接到效果链和分析器
      this.nodes.input.connect(this.effectsChain[this.state.currentEffect])
      this.nodes.input.connect(this.analyser)
      
      console.log('🎤 麦克风输入已连接')
      return true
      
    } catch (error) {
      console.error('❌ 无法获取麦克风:', error)
      throw error
    }
  }
  
  /**
   * 开始处理音频输入
   */
  async startProcessing() {
    if (!this.nodes.input) {
      await this.getUserMicrophone()
    }
    
    // 开始音频分析
    this.startAnalysis()
    
    console.log('▶️ 音频处理已开始')
  }
  
  /**
   * 开始音频分析
   */
  startAnalysis() {
    if (!this.analyser) return
    
    const analyze = () => {
      if (!this.isInitialized) return
      
      // 获取波形数据
      this.audioData.waveform = this.analyser.getValue()
      
      // 获取频谱数据
      this.audioData.spectrum = new Uint8Array(
        this.analyser.getValue('fft').map(v => (v + 1) * 128)
      )
      
      // 请求下一帧
      requestAnimationFrame(analyze)
    }
    
    analyze()
  }
  
  /**
   * 切换效果模式
   * @param {string} effect - 效果模式: 'dry' | 'beautify' | 'magic'
   */
  setEffectMode(effect) {
    if (!this.effectsChain[effect]) {
      console.warn(`效果模式 ${effect} 不存在`)
      return
    }
    
    // 断开当前连接
    if (this.nodes.input && this.state.currentEffect) {
      this.nodes.input.disconnect(this.effectsChain[this.state.currentEffect])
      this.nodes.input.disconnect(this.analyser)
    }
    
    // 连接到新效果
    this.nodes.input.connect(this.effectsChain[effect])
    this.nodes.input.connect(this.analyser)
    
    this.state.currentEffect = effect
    this.state.magicMode = effect === 'magic'
    
    console.log(`🎛️ 切换到 ${effect} 效果模式`)
    
    return effect
  }
  
  /**
   * 应用和声生成
   * @param {number} interval - 和声音程（半音数）
   * @param {number} intensity - 和声强度 0-1
   */
  applyHarmony(interval, intensity = 1.0) {
    // 这里将实现实时和声生成
    // 使用 Tone.PitchShift 或自定义算法
    console.log(`🎵 应用和声: ${interval} 半音, 强度: ${intensity}`)
    
    // TODO: 实现实时和声生成
    return interval
  }
  
  /**
   * 开始录音
   */
  async startRecording() {
    if (!this.isInitialized) return
    
    this.isRecording = true
    this.recorder.start()
    
    console.log('🔴 开始录音')
  }
  
  /**
   * 停止录音并获取录音数据
   */
  async stopRecording() {
    if (!this.isRecording) return
    
    this.isRecording = false
    const recording = await this.recorder.stop()
    
    console.log('⏹️ 录音停止')
    return recording
  }
  
  /**
   * 播放音频缓冲
   * @param {AudioBuffer} buffer - 音频缓冲
   * @param {Object} options - 播放选项
   */
  playBuffer(buffer, options = {}) {
    const player = new Tone.Player(buffer)
    
    if (options.loop) {
      player.loop = true
      player.loopStart = options.loopStart || 0
      player.loopEnd = options.loopEnd || buffer.duration
    }
    
    player.connect(this.effectsChain[options.effect || this.state.currentEffect])
    player.start(options.startTime)
    
    return player
  }
  
  /**
   * 获取当前音频数据
   */
  getAudioData() {
    return {
      ...this.audioData,
      effectMode: this.state.currentEffect,
      isMagicMode: this.state.magicMode,
      isRecording: this.isRecording
    }
  }
  
  /**
   * 设置音量
   * @param {number} volume - 音量 0-1
   */
  setVolume(volume) {
    const clampedVolume = Math.max(0, Math.min(1, volume))
    this.state.volume = clampedVolume
    
    if (this.masterOutput) {
      this.masterOutput.volume.value = Tone.gainToDb(clampedVolume)
    }
  }
  
  /**
   * 静音/取消静音
   */
  toggleMute() {
    this.state.isMuted = !this.state.isMuted
    
    if (this.masterOutput) {
      this.masterOutput.mute = this.state.isMuted
    }
    
    return this.state.isMuted
  }
  
  /**
   * 清理资源
   */
  async cleanup() {
    if (this.inputStream) {
      this.inputStream.getTracks().forEach(track => track.stop())
    }
    
    if (this.nodes.input) {
      this.nodes.input.close()
    }
    
    if (Tone.context.state !== 'closed') {
      await Tone.context.close()
    }
    
    this.isInitialized = false
    console.log('🧹 音频引擎资源已清理')
  }
}

// 单例模式导出
const audioEngine = new AudioEngine()
export default audioEngine