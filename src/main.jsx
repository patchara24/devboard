import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * จุดเริ่มต้น (Entry Point) ของแอปพลิเคชัน React
 * ทำหน้าที่นำคอมโพเนนต์หลักอย่าง <App /> ไปประทับ/เรนเดอร์ลงใน DOM ของ HTML ที่มี id แบบ "root"
 * และครอบด้วย <StrictMode> เพื่อคอยตรวจจับแจ้งเตือนโค้ดที่อาจมีปัญหาตามมาตรฐานของ React
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
