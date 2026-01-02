// 音频配置常量
export const AUDIO_CONFIG = {
  SAMPLE_RATE: 44100,
  FFT_SIZE: 2048,
  SMOOTHING_TIME: 0.8,
  BUFFER_SIZE: 4096,
  
  // 和声检测阈值
  PITCH_THRESHOLD: 0.9,
  CONFIDENCE_THRESHOLD: 0.7,
  
  // 音程检测容差（半音）
  INTERVAL_TOLERANCE: 0.3,
  
  // 美化效果参数
  BEAUTIFY: {
    PITCH_CORRECTION_STRENGTH: 0.7,  // 音高校正强度
    HARMONY_THICKNESS: 4,            // 和声层数
    REVERB_WET: 0.3,                 // 混响干湿比
    DELAY_FEEDBACK: 0.5              // 延迟反馈
  },
  
  // 理想效果夸张参数（魔法模式）
  MAGIC: {
    PITCH_CORRECTION_STRENGTH: 1.0,
    HARMONY_THICKNESS: 8,
    REVERB_WET: 0.5,
    DELAY_FEEDBACK: 0.7,
    CHORUS_DEPTH: 0.8,
    COMPRESSION_RATIO: 4
  }
}

// 和声练习配置
export const TRAINING_CONFIG = {
  // 难度级别
  LEVELS: {
    BEGINNER: {
      PITCH_TOLERANCE: 2.0,  // 半音容差
      TEMPO: 80,             // BPM
      FEEDBACK_DELAY: 1000   // 反馈延迟ms
    },
    INTERMEDIATE: {
      PITCH_TOLERANCE: 1.0,
      TEMPO: 100,
      FEEDBACK_DELAY: 500
    },
    ADVANCED: {
      PITCH_TOLERANCE: 0.5,
      TEMPO: 120,
      FEEDBACK_DELAY: 250
    }
  },
  
  // 练习类型
  EXERCISE_TYPES: {
    PITCH_MATCHING: 'pitch_matching',
    INTERVAL_SINGING: 'interval_singing',
    HARMONY_TRACKING: 'harmony_tracking',
    FREE_CREATION: 'free_creation'
  },
  
  // 成就阈值
  ACHIEVEMENTS: {
    PERFECT_STREAK: 10,      // 连续完美次数
    DAILY_PRACTICE: 5,       // 每日练习分钟数
    LEVEL_COMPLETE: 80       // 关卡完成百分比
  }
}

// UI配置
export const UI_CONFIG = {
  // 动画时长
  ANIMATION: {
    QUICK: 150,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000
  },
  
  // 可视化设置
  VISUALIZATION: {
    WAVEFORM_HEIGHT: 120,
    SPECTRUM_HEIGHT: 80,
    PITCH_LINE_WIDTH: 2,
    HARMONY_OPACITY: 0.7
  },
  
  // 响应式断点
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 768,
    DESKTOP: 1024,
    WIDE: 1280
  }
}

// 音程定义
export const INTERVALS = {
  UNISON: 0,
  MINOR_SECOND: 1,
  MAJOR_SECOND: 2,
  MINOR_THIRD: 3,
  MAJOR_THIRD: 4,
  PERFECT_FOURTH: 5,
  TRITONE: 6,
  PERFECT_FIFTH: 7,
  MINOR_SIXTH: 8,
  MAJOR_SIXTH: 9,
  MINOR_SEVENTH: 10,
  MAJOR_SEVENTH: 11,
  OCTAVE: 12
}

// 和弦类型
export const CHORD_TYPES = {
  MAJOR: [INTERVALS.MAJOR_THIRD, INTERVALS.PERFECT_FIFTH],
  MINOR: [INTERVALS.MINOR_THIRD, INTERVALS.PERFECT_FIFTH],
  DOMINANT_7: [INTERVALS.MAJOR_THIRD, INTERVALS.PERFECT_FIFTH, INTERVALS.MINOR_SEVENTH],
  MAJOR_7: [INTERVALS.MAJOR_THIRD, INTERVALS.PERFECT_FIFTH, INTERVALS.MAJOR_SEVENTH]
}

// 预设歌曲（演示用）
export const DEMO_SONGS = [
  {
    id: 'twinkle',
    title: '小星星',
    artist: '传统儿歌',
    difficulty: 'beginner',
    tempo: 100,
    key: 'C',
    sections: [
      {
        id: 'verse1',
        chords: ['C', 'C', 'G', 'G', 'A', 'A', 'G'],
        melody: ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4']
      }
    ]
  },
  {
    id: 'moonlight',
    title: '月亮代表我的心',
    artist: '邓丽君',
    difficulty: 'intermediate',
    tempo: 70,
    key: 'C',
    sections: [
      {
        id: 'chorus',
        chords: ['C', 'Am', 'F', 'G'],
        melody: ['G4', 'E4', 'C4', 'E4']
      }
    ]
  }
]