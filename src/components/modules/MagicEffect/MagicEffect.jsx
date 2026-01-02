import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudioContext } from '../../../hooks/useAudioContext'
import Knob from '../../ui/Knob/Knob'
import Button from '../../ui/Button/Button'
import Visualizer from '../../ui/Visualizer/Visualizer'
import './MagicEffect.css'

/**
 * 魔法效果模块 - 核心体验模块
 * 提供从普通到神奇的听觉变化体验
 */
const MagicEffect = () => {
  const {
    isReady,
    hasPermission,
    effectMode,
    setEffectMode,
    audioData,
    startMicrophone
  } = useAudioContext()
  
  const [isActive, setIsActive] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [harmonyLevel, setHarmonyLevel] = useState(0.7)
  const [thickness, setThickness] = useState(0.5)
  const [space, setSpace] = useState(0.6)
  
  // 自动激活魔法模式
  useEffect(() => {
    if (isReady && !hasPermission) {
      startMicrophone()
    }
  }, [isReady, hasPermission, startMicrophone])
  
  const handleMagicToggle = () => {
    if (!isActive) {
      setEffectMode('magic')
      setIsActive(true)
      
      // 3秒后自动展示对比
      setTimeout(() => {
        setShowComparison(true)
      }, 3000)
    } else {
      setEffectMode('beautify')
      setIsActive(false)
      setShowComparison(false)
    }
  }
  
  const handleEffectChange = (mode) => {
    setEffectMode(mode)
    setIsActive(mode === 'magic')
  }
  
  return (
    <motion.div 
      className="magic-effect-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 模块标题 */}
      <div className="module-header">
        <h2 className="module-title">
          <span className="title-icon">✨</span>
          魔法和声变换器
        </h2>
        <p className="module-description">
          体验从普通演唱到专业和声的魔法变化
        </p>
      </div>
      
      {/* 主控制面板 */}
      <div className="magic-control-panel">
        {/* 效果模式选择 */}
        <div className="mode-selector">
          <Button
            variant={effectMode === 'dry' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleEffectChange('dry')}
            className="mode-button"
          >
            原声模式
          </Button>
          <Button
            variant={effectMode === 'beautify' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleEffectChange('beautify')}
            className="mode-button"
          >
            美化模式
          </Button>
          <Button
            variant={effectMode === 'magic' ? 'primary' : 'secondary'}
            size="lg"
            onClick={handleMagicToggle}
            className={`magic-button ${isActive ? 'active' : ''}`}
            icon={isActive ? '✨' : '🌟'}
          >
            {isActive ? '魔法模式开启' : '开启魔法模式'}
          </Button>
        </div>
        
        {/* 可视化区域 */}
        <div className="visualization-section">
          <Visualizer
            type="waveform"
            data={audioData.waveform}
            height={120}
            colors={{
              primary: isActive ? '#8b5cf6' : '#3b82f6',
              secondary: isActive ? '#ec4899' : '#10b981'
            }}
          />
          
          <div className="visualizer-info">
            <div className="info-item">
              <span className="info-label">效果强度:</span>
              <span className="info-value">
                {effectMode === 'dry' ? '0%' : 
                 effectMode === 'beautify' ? '50%' : '100%'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">和声层数:</span>
              <span className="info-value">
                {isActive ? '8层' : '4层'}
              </span>
            </div>
          </div>
        </div>
        
        {/* 效果参数控制 */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="effect-parameters"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="parameters-title">魔法效果调节</h3>
              
              <div className="knob-grid">
                <Knob
                  value={harmonyLevel}
                  onChange={setHarmonyLevel}
                  min={0}
                  max={1}
                  step={0.05}
                  size={70}
                  label="和谐度"
                  unit="%"
                  theme="neon"
                />
                
                <Knob
                  value={thickness}
                  onChange={setThickness}
                  min={0}
                  max={1}
                  step={0.05}
                  size={70}
                  label="厚度"
                  unit="%"
                  theme="neon"
                />
                
                <Knob
                  value={space}
                  onChange={setSpace}
                  min={0}
                  max={1}
                  step={0.05}
                  size={70}
                  label="空间感"
                  unit="%"
                  theme="neon"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* A/B对比 */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              className="comparison-section"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="comparison-title">🎯 目标对比</h3>
              
              <div className="comparison-grid">
                <div className="comparison-item before">
                  <div className="comparison-label">你的现状</div>
                  <div className="comparison-bar">
                    <div 
                      className="bar-fill" 
                      style={{ width: '40%', background: '#3b82f6' }}
                    />
                  </div>
                  <div className="comparison-stats">
                    <span>和谐度: 40%</span>
                    <span>厚度: 2层</span>
                  </div>
                </div>
                
                <div className="comparison-arrow">→</div>
                
                <div className="comparison-item after">
                  <div className="comparison-label">目标效果</div>
                  <div className="comparison-bar">
                    <div 
                      className="bar-fill" 
                      style={{ width: '90%', background: 'linear-gradient(90deg, #8b5cf6, #ec4899)' }}
                    />
                  </div>
                  <div className="comparison-stats">
                    <span>和谐度: 90%</span>
                    <span>厚度: 8层</span>
                  </div>
                </div>
              </div>
              
              <div className="comparison-tip">
                💡 <strong>练习目标:</strong> 通过30天训练，让你的左侧指标接近右侧
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* 操作指南 */}
        <div className="instruction-panel">
          <div className="instruction-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <strong>对着麦克风唱歌</strong>
              <p>任何简单的旋律都可以，比如《小星星》</p>
            </div>
          </div>
          
          <div className="instruction-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <strong>点击"开启魔法模式"</strong>
              <p>感受你的声音瞬间变成专业和声效果</p>
            </div>
          </div>
          
          <div className="instruction-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <strong>尝试调整旋钮</strong>
              <p>找到你最喜欢的和声效果</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 状态指示 */}
      <div className="status-indicator">
        <div className={`status-dot ${hasPermission ? 'connected' : 'disconnected'}`} />
        <span className="status-text">
          {hasPermission ? '麦克风已连接' : '等待麦克风权限...'}
        </span>
      </div>
    </motion.div>
  )
}

export default MagicEffect