import { useState, useEffect, useCallback } from 'react'
import audioEngine from '../utils/audio/audioEngine'

/**
 * 音频上下文管理Hook
 * 提供音频引擎的React友好接口
 */
export const useAudioContext = () => {
  const [state, setState] = useState({
    isInitialized: false,
    isReady: false,
    hasPermission: false,
    isLoading: false,
    error: null,
    effectMode: 'beautify',
    isMagicMode: false,
    volume: 0.7,
    isMuted: false
  })
  
  const [audioData, setAudioData] = useState({
    waveform: new Float32Array(1024),
    spectrum: new Uint8Array(512),
    pitch: 0,
    confidence: 0
  })
  
  // 初始化音频引擎
  const initialize = useCallback(async () => {
    if (state.isInitialized || state.isLoading) return
    
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const success = await audioEngine.initialize()
      
      if (success) {
        setState(prev => ({
          ...prev,
          isInitialized: true,
          isReady: true,
          isLoading: false
        }))
        
        // 开始获取音频数据
        startAudioDataStream()
      } else {
        throw new Error('音频引擎初始化失败')
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message
      }))
      console.error('音频初始化错误:', error)
    }
  }, [state.isInitialized, state.isLoading])
  
  // 请求麦克风权限并开始处理
  const startMicrophone = useCallback(async () => {
    if (!state.isInitialized) {
      await initialize()
    }
    
    try {
      await audioEngine.getUserMicrophone()
      await audioEngine.startProcessing()
      
      setState(prev => ({
        ...prev,
        hasPermission: true
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error.message
      }))
    }
  }, [state.isInitialized, initialize])
  
  // 切换效果模式
  const setEffectMode = useCallback((mode) => {
    if (!['dry', 'beautify', 'magic'].includes(mode)) {
      console.warn(`无效的效果模式: ${mode}`)
      return
    }
    
    const newMode = audioEngine.setEffectMode(mode)
    
    setState(prev => ({
      ...prev,
      effectMode: newMode,
      isMagicMode: newMode === 'magic'
    }))
    
    return newMode
  }, [])
  
  // 设置音量
  const setVolume = useCallback((volume) => {
    const clampedVolume = Math.max(0, Math.min(1, volume))
    audioEngine.setVolume(clampedVolume)
    
    setState(prev => ({ ...prev, volume: clampedVolume }))
  }, [])
  
  // 切换静音
  const toggleMute = useCallback(() => {
    const isMuted = audioEngine.toggleMute()
    setState(prev => ({ ...prev, isMuted }))
    return isMuted
  }, [])
  
  // 开始录音
  const startRecording = useCallback(async () => {
    if (!state.hasPermission) {
      await startMicrophone()
    }
    
    await audioEngine.startRecording()
  }, [state.hasPermission, startMicrophone])
  
  // 停止录音
  const stopRecording = useCallback(async () => {
    return await audioEngine.stopRecording()
  }, [])
  
  // 实时音频数据流
  const startAudioDataStream = useCallback(() => {
    let animationId
    
    const updateAudioData = () => {
      const data = audioEngine.getAudioData()
      setAudioData(prev => ({
        ...prev,
        waveform: data.waveform,
        spectrum: data.spectrum,
        pitch: data.pitch,
        confidence: data.confidence
      }))
      
      animationId = requestAnimationFrame(updateAudioData)
    }
    
    updateAudioData()
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])
  
  // 清理效果
  useEffect(() => {
    return () => {
      if (state.isInitialized) {
        audioEngine.cleanup()
      }
    }
  }, [state.isInitialized])
  
  return {
    // 状态
    ...state,
    audioData,
    
    // 方法
    initialize,
    startMicrophone,
    setEffectMode,
    setVolume,
    toggleMute,
    startRecording,
    stopRecording,
    
    // 音频引擎实例（高级用法）
    engine: audioEngine
  }
}