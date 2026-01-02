import React from "react"
import "./App.css"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-studio-dark via-studio-panel to-studio-accent p-6">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <header className="text-center py-12">
          <div className="inline-block animate-float">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text 
                         bg-gradient-to-r from-harmony-blue via-harmony-purple to-harmony-pink mb-4">
              🎵 Harmony Gateway
            </h1>
          </div>
          <p className="text-xl text-studio-light">
            和声训练系统 - 诗班专用版
          </p>
        </header>

        {/* 主内容 */}
        <main className="glass-panel rounded-3xl p-8 mb-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 
                          bg-gradient-to-r from-harmony-green to-harmony-blue 
                          rounded-full mb-6 animate-pulse-slow">
              <i className="fas fa-music text-2xl"></i>
            </div>
            <h2 className="text-3xl font-bold mb-4">系统运行测试</h2>
            <p className="text-studio-light mb-8">
              基础框架已加载，准备开始音频功能开发
            </p>
          </div>

          {/* 状态指示器 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gradient-to-br from-harmony-blue/20 to-harmony-purple/20 
                          p-6 rounded-2xl border border-harmony-blue/30">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-harmony-blue rounded-full mr-3 animate-glow"></div>
                <h3 className="text-xl font-semibold">React 状态</h3>
              </div>
              <p className="text-green-400 font-mono">✓ 运行正常</p>
            </div>

            <div className="bg-gradient-to-br from-harmony-green/20 to-harmony-amber/20 
                          p-6 rounded-2xl border border-harmony-green/30">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-harmony-green rounded-full mr-3 animate-pulse"></div>
                <h3 className="text-xl font-semibold">样式系统</h3>
              </div>
              <p className="text-green-400 font-mono">✓ Tailwind 已加载</p>
            </div>

            <div className="bg-gradient-to-br from-harmony-amber/20 to-harmony-pink/20 
                          p-6 rounded-2xl border border-harmony-amber/30">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-harmony-amber rounded-full mr-3"></div>
                <h3 className="text-xl font-semibold">音频引擎</h3>
              </div>
              <p className="text-yellow-400 font-mono">⏳ 等待初始化</p>
            </div>
          </div>

          {/* 测试按钮 */}
          <div className="text-center">
            <button
              onClick={() => alert("🎉 恭喜！应用基础框架运行成功！\n\n下一步：实现音频功能")}
              className="harmony-button bg-gradient-to-r from-harmony-blue to-harmony-purple 
                       text-white text-lg font-semibold px-10 py-4 rounded-full
                       hover:shadow-2xl hover:shadow-harmony-purple/50
                       transform hover:-translate-y-1 transition-all duration-300"
            >
              <i className="fas fa-play mr-3"></i>
              点击测试交互
            </button>
          </div>

          {/* 功能预览 */}
          <div className="mt-12 pt-8 border-t border-studio-accent">
            <h3 className="text-2xl font-bold mb-6 text-center">功能预览</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-harmony-blue">
                  <i className="fas fa-wave-square mr-2"></i>
                  音频处理
                </h4>
                <ul className="space-y-3">
                  {['实时音高检测', '智能和声生成', '魔法效果变换', '多轨录音'].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-2 h-2 bg-harmony-blue rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-harmony-green">
                  <i className="fas fa-users mr-2"></i>
                  诗班功能
                </h4>
                <ul className="space-y-3">
                  {['四声部训练', '赞美诗库', '练习记录', '进度追踪'].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-2 h-2 bg-harmony-green rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>

        {/* 页脚 */}
        <footer className="text-center py-8 text-studio-light">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-harmony-green rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm">React 18</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-harmony-blue rounded-full mr-2"></div>
              <span className="text-sm">Vite</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-harmony-purple rounded-full mr-2"></div>
              <span className="text-sm">Tailwind CSS</span>
            </div>
          </div>
          <p>为教会诗班训练打造的专用工具</p>
          <p className="text-sm mt-2 opacity-75">
            {window.location.hostname === 'localhost' ? '开发模式' : '生产环境'}
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
