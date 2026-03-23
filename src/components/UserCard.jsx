/**
 * คอมโพเนนต์สำหรับดีไซน์การ์ดและรับข้อมูลโปรไฟล์แสดงผลผู้ใช้แต่ละคน (UserCard)
 * สร้างภาพ Avatar วงกลมแบบกำหนดสีพื้นหลังเองตามตัวอักษรย่อจากชื่อผู้ใช้
 */
function UserCard({ name, email }) {
    // ดึงตัวอักษรแรกมาทำ avatar
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");

    const avatarColor = (name) => {
        const color = name.toLowerCase().charAt(0);
        if (/[a-g]/.test(color)) return "#1e40af";
        else if (/[h-n]/.test(color)) return "#06952aff";
        else if (/[o-z]/.test(color)) return "#8217b4ff";
        else return "#b2b1b1ff";
    };
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                marginBottom: "0.75rem",
                background: "white",
            }}
        >
            <div
                style={{
                    width: "40px",
                    height: "40px",
                    background: avatarColor(name),
                    color: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                }}
            >
                {initials}
            </div>
            <div>
                <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>
                <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
            </div>
        </div>
    );
}

export default UserCard;