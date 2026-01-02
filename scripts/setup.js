#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')

console.log('🚀 Harmony Gateway 项目初始化...')

// 创建目录结构
const directories = [
  'src/assets/audio/demos',
  'src/assets/audio/samples',
  'src/assets/images/ui',
  'src/assets/images/backgrounds',
  'src/components/layout',
  'src/components/ui/Button',
  'src/components/ui/Slider',
  'src/components/ui/Knob',
  'src/components/ui/LED',
  'src/components/ui/VUMeter',
  'src/components/ui/Visualizer',
  'src/components/modules/MagicEffect',
  'src/components/modules/PitchTrainer',
  'src/components/modules/HarmonyLab',
  'src/components/modules/SongLibrary',
  'src/components/common',
  'src/hooks',
  'src/utils/audio',
  'src/utils/math',
  'src/utils/visualization',
  'src/utils/helpers',
  'src/services',
  'src/stores',
  'src/styles/components',
  'src/styles/themes',
  'src/styles/animations',
  'src/data',
  'src/config',
  'docs',
  'scripts'
]

directories.forEach(dir => {
  const fullPath = path.join(projectRoot, dir)
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true })
    console.log(`📁 创建目录: ${dir}`)
  }
})

console.log('✅ 目录结构创建完成')

// 创建README.md
const readmeContent = `# Harmony Gateway - 和声训练系统

## 🎯 项目概述

Harmony Gateway 是一个革命性的和声训练系统，通过"魔法效果体验"引导用户学习和声演唱。

## ✨ 核心特性

### 1. 魔法效果变换器
- 实时将普通演唱转化为专业和声
- 三种效果模式：原声 → 美化 → 魔法
- 夸张的理想效果作为学习目标

### 2. 渐进式学习路径
- 从"好玩"到"会唱"的自然过渡
- 基于游戏的成就系统
- 个性化的难度调整

### 3. 专业音频处理
- 基于Web Audio API的实时处理
- 多轨和声生成
- 专业级效果链

### 4. 沉浸式界面
- 模拟专业音频设备的UI
- 实时可视化反馈
- 响应式设计

## 🚀 快速开始

### 开发环境
\`\`\`bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
\`\`\`

### 项目结构
\`\`\`
harmony-gateway/
├── src/                    # 源代码
│   ├── components/        # React组件
│   ├── hooks/            # 自定义Hooks
│   ├── utils/            # 工具函数
│   ├── styles/           # 样式文件
│   └── ...
├── public/               # 静态资源
└── docs/                 # 文档
\`\`\`

## 🛠️ 技术栈

- **前端框架**: React 18 + Vite
- **音频处理**: Tone.js + Web Audio API
- **状态管理**: Zustand
- **动画**: Framer Motion
- **样式**: Tailwind CSS + CSS Modules
- **构建工具**: Vite

## 📁 核心模块

### 音频引擎 (\`src/utils/audio/\`)
- \`audioEngine.js\` - 主音频引擎
- \`pitchDetector.js\` - 音高检测
- \`harmonyGenerator.js\` - 和声生成
- \`effectsProcessor.js\` - 效果处理

### UI组件 (\`src/components/ui/\`)
- \`Knob/\` - 专业旋钮组件
- \`Slider/\` - 推子控件
- \`LED/\` - LED指示灯
- \`Visualizer/\` - 音频可视化

### 功能模块 (\`src/components/modules/\`)
- \`MagicEffect/\` - 魔法效果体验
- \`PitchTrainer/\` - 音高训练
- \`HarmonyLab/\` - 和声实验室
- \`SongLibrary/\` - 歌曲库

## 🔧 开发指南

### 音频开发
1. 所有音频操作通过 \`audioEngine\` 单例
2. 使用 \`useAudioContext\` Hook访问音频功能
3. 效果处理使用预设链，不要直接操作Web Audio节点

### 组件开发
1. 使用TypeScript或PropTypes进行类型检查
2. 遵循Atomic Design原则
3. 所有交互组件支持键盘和触摸

### 样式指南
1. 使用CSS变量定义主题颜色
2. 组件样式使用CSS Modules
3. 通用样式使用Tailwind

## 🎨 设计原则

### 用户体验
1. **30秒定律**: 用户30秒内必须体验到"魔法效果"
2. **渐进暴露**: 复杂功能逐步解锁
3. **即时反馈**: 所有操作立即获得反馈

### 音频效果
1. **效果显著性**: 效果变化必须明显可听
2. **理想对比**: 始终显示"现状"与"理想"的对比
3. **美化而非欺骗**: 效果要美化但不过分虚假

## 📱 响应式设计

- **移动端**: 640px以下，简化控件
- **平板**: 768px-1024px，两栏布局
- **桌面**: 1024px以上，完整工作室布局

## 🔐 权限处理

1. 首次访问请求麦克风权限
2. 优雅处理权限拒绝
3. 提供离线演示模式

## 🧪 测试

\`\`\`bash
# 单元测试
npm test

# E2E测试
npm run test:e2e

# 音频测试
npm run test:audio
\`\`\`

## 📄 许可证

MIT
`

fs.writeFileSync(path.join(projectRoot, 'README.md'), readmeContent)
console.log('📄 README.md 创建完成')

// 创建package.json如果不存在
if (!fs.existsSync(path.join(projectRoot, 'package.json'))) {
  const packageJson = {
    name: "harmony-gateway",
    version: "1.0.0",
    private: true,
    type: "module",
    scripts: {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview",
      "setup": "node scripts/setup.js",
      "lint": "eslint src --ext js,jsx --fix",
      "format": "prettier --write src/**/*.{js,jsx,css}",
      "test": "vitest",
      "deploy": "npm run build && gh-pages -d dist"
    },
    dependencies: {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "zustand": "^4.4.1",
      "tone": "^14.7.77",
      "wavesurfer.js": "^7.5.2",
      "pitchy": "^2.0.0",
      "framer-motion": "^10.16.4",
      "classnames": "^2.3.2",
      "react-icons": "^4.11.0",
      "react-router-dom": "^6.14.2"
    },
    devDependencies: {
      "@vitejs/plugin-react": "^4.0.0",
      "vite": "^4.4.0",
      "autoprefixer": "^10.4.14",
      "postcss": "^8.4.27",
      "tailwindcss": "^3.3.3",
      "@tailwindcss/forms": "^0.5.7",
      "eslint": "^8.45.0",
      "prettier": "^3.0.0",
      "vitest": "^0.34.0",
      "@testing-library/react": "^14.0.0",
      "@testing-library/jest-dom": "^6.0.0",
      "gh-pages": "^5.0.0"
    },
    browserslist: {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    }
  }

  fs.writeFileSync(
    path.join(projectRoot, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  )
  console.log('📦 package.json 创建完成')
}

console.log('\n✅ 项目初始化完成！')
console.log('\n接下来请运行:')
console.log('1. npm install')
console.log('2. npm run dev')
console.log('\n🎉 开始你的和声魔法之旅吧！')