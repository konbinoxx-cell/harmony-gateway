import React from "react"
export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        🎵 Harmony Gateway
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem", opacity: 0.8 }}>
        和声训练系统 - 部署测试版
      </p>
      <button 
        onClick={() => alert("部署成功！准备添加音频功能")}
        style={{
          background: "#3b82f6",
          color: "white",
          border: "none",
          padding: "12px 24px",
          fontSize: "1rem",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "2rem"
        }}
      >
        点击测试
      </button>
      <div style={{ 
        background: "rgba(255,255,255,0.1)", 
        padding: "20px", 
        borderRadius: "8px",
        maxWidth: "500px"
      }}>
        <h3>部署状态</h3>
        <p>✓ React 应用运行正常</p>
        <p>✓ 准备部署到 Cloudflare Pages</p>
        <p>⏳ 音频功能即将添加</p>
      </div>
      <footer style={{ marginTop: "3rem", opacity: 0.6, fontSize: "0.9rem" }}>
        <p>为教会诗班训练打造的专用工具</p>
        <p>cloudflare.pages.dev 部署测试</p>
      </footer>
    </div>
  )
}
