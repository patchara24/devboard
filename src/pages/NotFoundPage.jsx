import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ maxWidth: "700px", margin: "4rem auto", padding: "0 1rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "4rem", margin: "0 0 1rem", color: "#e53e3e" }}>404</h1>
      <p style={{ fontSize: "1.2rem", color: "#4a5568", marginBottom: "2rem" }}>
        ไม่พบหน้าที่คุณต้องการ
      </p>
      <Link
        to="/"
        style={{
          background: "#1e40af",
          color: "white",
          textDecoration: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "6px",
          display: "inline-block",
        }}
      >
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}

export default NotFoundPage;
