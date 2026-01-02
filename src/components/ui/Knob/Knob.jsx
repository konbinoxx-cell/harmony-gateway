import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import './Knob.css'

/**
 * 专业旋钮组件
 * 模拟真实音频设备旋钮的交互体验
 */
const Knob = ({
  value = 0.5,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  size = 60,
  label = '',
  unit = '',
  theme = 'default',
  showValue = true,
  disabled = false,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [displayValue, setDisplayValue] = useState(value)
  const knobRef = useRef(null)
  const startY = useRef(0)
  const startValue = useRef(value)
  
  // 计算旋钮旋转角度
  const rotation = ((value - min) / (max - min)) * 270 - 135 // -135° to 135°
  
  // 格式化显示值
  const formatValue = useCallback((val) => {
    if (unit === '%') {
      return `${Math.round(val * 100)}%`
    }
    if (unit === 'dB') {
      const db = 20 * Math.log10(val || 0.001)
      return db > -60 ? `${db.toFixed(1)}dB` : '-∞ dB'
    }
    if (step < 0.1) {
      return val.toFixed(2)
    }
    if (step < 1) {
      return val.toFixed(1)
    }
    return Math.round(val)
  }, [unit, step])
  
  // 处理鼠标按下
  const handleMouseDown = useCallback((e) => {
    if (disabled) return
    
    e.preventDefault()
    setIsDragging(true)
    startY.current = e.clientY
    startValue.current = value
    
    // 添加全局事件监听
    const handleMouseMove = (moveEvent) => {
      const deltaY = startY.current - moveEvent.clientY
      const deltaValue = (deltaY / 100) * (max - min)
      
      let newValue = startValue.current + deltaValue
      newValue = Math.max(min, Math.min(max, newValue))
      
      // 应用步进
      if (step) {
        newValue = Math.round(newValue / step) * step
      }
      
      setDisplayValue(newValue)
      onChange?.(newValue)
    }
    
    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [value, min, max, step, onChange, disabled])
  
  // 处理触摸事件
  const handleTouchStart = useCallback((e) => {
    if (disabled) return
    
    e.preventDefault()
    setIsDragging(true)
    startY.current = e.touches[0].clientY
    startValue.current = value
    
    const handleTouchMove = (moveEvent) => {
      const deltaY = startY.current - moveEvent.touches[0].clientY
      const deltaValue = (deltaY / 100) * (max - min)
      
      let newValue = startValue.current + deltaValue
      newValue = Math.max(min, Math.min(max, newValue))
      
      if (step) {
        newValue = Math.round(newValue / step) * step
      }
      
      setDisplayValue(newValue)
      onChange?.(newValue)
    }
    
    const handleTouchEnd = () => {
      setIsDragging(false)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
  }, [value, min, max, step, onChange, disabled])
  
  return (
    <motion.div
      className={`knob-container ${theme} ${disabled ? 'disabled' : ''} ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: isDragging ? 1.05 : 1,
        boxShadow: isDragging
          ? '0 0 20px rgba(59, 130, 246, 0.5)'
          : '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div
        ref={knobRef}
        className="knob"
        style={{
          width: size,
          height: size,
          transform: `rotate(${rotation}deg)`
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* 旋钮主体 */}
        <div className="knob-body">
          {/* 旋钮顶部指示器 */}
          <div className="knob-indicator" />
          
          {/* 旋钮刻度 */}
          <div className="knob-ticks">
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                className="knob-tick"
                style={{
                  transform: `rotate(${i * 27}deg)`,
                  opacity: i % 2 === 0 ? 1 : 0.5
                }}
              />
            ))}
          </div>
          
          {/* 中心点 */}
          <div className="knob-center" />
        </div>
      </div>
      
      {/* 标签和值显示 */}
      <div className="knob-info">
        {label && <div className="knob-label">{label}</div>}
        {showValue && (
          <div className="knob-value">
            {formatValue(displayValue)}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// 预设主题配置
Knob.themes = {
  default: 'theme-default',
  vintage: 'theme-vintage',
  neon: 'theme-neon',
  minimal: 'theme-minimal'
}

export default Knob