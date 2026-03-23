/**
 * คอมโพเนนต์แบบเรียบง่ายสำหรับบอกสถิติรวมของโพสต์
 * รับค่า count เป็น props เพื่อบอกจำนวนโพสต์
 */
export default function PostCount({ count }) {
    return (
        <div style={{ marginBottom: "1rem", color: "#4a5568", fontWeight: "500" }}>
            โพสต์ทั้งหมด: {count} รายการ
        </div>
    );
}