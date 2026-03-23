// นำเข้า hook useState และ useEffect จากไลบรารี react เพื่อใช้จัดการ state และ effect
import { useState, useEffect } from "react";
// นำเข้าคอมโพเนนต์ LoadingSpinner จากไฟล์ในโฟลเดอร์เดียวกัน (ถึงแม้จะไม่ได้ใช้ในโค้ดตรงนี้)
import LoadingSpinner from "./LoadingSpinner";

// ประกาศสร้างฟังก์ชันคอมโพเนนต์ชื่อ CommentList โดยรับ props เป็นออบเจกต์ที่มีคีย์ postId
function CommentList({ postId }) {
  // ประกาศ state ชื่อ comments สำหรับเก็บข้อมูลความคิดเห็น และฟังก์ชัน setComments สำหรับอัปเดต state กำหนดค่าเริ่มต้นเป็นอาร์เรย์ว่าง
  const [comments, setComments] = useState([]);
  // ประกาศ state ชื่อ loading สำหรับตรวจสอบว่ากำลังดึงข้อมูลอยู่หรือไม่ กำหนดค่าเริ่มต้นเป็น true เพราะต้องโหลดข้อมูลตั้งแต่เริ่ม
  const [loading, setLoading] = useState(true);
  // ประกาศ state ชื่อ error สำหรับเก็บข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาด กำหนดค่าเริ่มต้นเป็น null แสดงว่ายังไม่มีข้อผิดพลาด
  const [error, setError] = useState(null);

  // เรียกใช้ useEffect hook เพื่อจัดการ side effects (เช่น การดึงข้อมูลจาก API) ซึ่งจะทำงานทุกครั้งเมื่อ postId เปลี่ยนแปลง
  useEffect(() => {
    // ประกาศฟังก์ชันแบบ asynchronous ชื่อ fetchComments เพื่อไปประมวลผลการดึงข้อมูล
    async function fetchComments() {
      // เริ่มต้นบล็อก try เพื่อรองรับการจัดการและดักจับข้อผิดพลาด (Exception) ที่อาจเกิดขึ้นระหว่างการดึงข้อมูล
      try {
        // อัปเดต state loading ให้เป็น true เป็นสัญญาณบอกว่ากำลังโหลดข้อมูล
        setLoading(true);
        // ใช้ fetch ไปเรียกขอข้อมูลความคิดเห็นของ postId นั้นๆ จาก API จำลองของ jsonplaceholder และใช้ await ให้หยุดรอจนกว่าข้อมูล response จะตอบกลับ
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        );
        // ตรวจสอบเงื่อนไขว่าถ้า response ไปพบข้อผิดพลาดหรือไม่สำเร็จ ให้โยน (throw) Error เพื่อเข้าสู่บล็อก catch ด้วยข้อความที่กำหนด
        if (!res.ok) throw new Error("ดึงความคิดเห็นไม่สำเร็จ");
        // สกัดข้อมูล response ออกมาแล้วพาร์ส (parse) เป็น JSON format ใส่ตัวแปร data ด้วยคำสั่ง await เพื่อให้รอการประมวลแปลงเป็น JavaScript object จนเสร็จเสียก่อน
        const data = await res.json();
        // นำข้อมูล array ความคิดเห็น (data) ไปเก็บไว้เพื่อให้ state comments ใช้อัพเดตเพื่อส่งไปเรนเดอร์ต่อ
        setComments(data);
        // กรณีถ้ามีโค้ดรันผิดพลาด (เช่น เน็ตหลุด หรือ API ล่ม) จะกระโดดมาสู่บล็อก catch พร้อมเก็บข้อผิดพลาดนั้นไว้ที่ตัวแปร err
      } catch (err) {
        // ใช้ setError เพื่ออัปเดตตัวแปร error เก็บข้อความความผิดพลาดนั้น (err.message) นำไปจัดการในการแจ้งเตือนตอนแสดงผล
        setError(err.message);
        // บล็อก finally จะถูกแวะเข้ามาทำงานในขั้นตอนสุดท้ายเสมอหลังจากผ่าน try (กรณีสำเร็จ) หรือ catch (กรณีผิดพลาด) เสร็จเรียบร้อยแล้ว
      } finally {
        // ตั้ง state loading กลับไปเป็น false ให้แน่ใจว่าได้สิ้นสุดกระบวนการโหลดทั้งหมดแล้ว
        setLoading(false);
      }
    }
    // เมื่อ useEffect ทำงาน ให้เรียกใช้ฟังก์ชัน fetchComments() ด้านบนให้ทำงานทันที
    fetchComments();
    // กำหนด Dependency เป็นอาร์เรย์ที่มี [postId] เพื่อบอกให้ useEffect คอยตรวจจับให้ทำงานใหม่เมื่อ postId เปลี่ยนไปเท่านั้น 
  }, [postId]);

  // หาก state loading มีค่าเป็น true (กำลังโหลดอยู่) ให้เรนเดอร์แท็กข้อความว่า "กำลังโหลดความคิดเห็น..." ด้วยอักษรสีเทา
  if (loading)
    return <p style={{ color: "#718096" }}>กำลังโหลดความคิดเห็น...</p>;
  // ถ้าเกิด state error ไม่เท่ากับ null (แสดงว่ามีข้อผิดพลาด) เราจะไม่โชว์หน้าจอปกติแต่ไปแสดงข้อความข้อผิดพลาดด้วยตัวอักษรสีแดงแทน
  if (error) return <p style={{ color: "#c53030" }}>{error}</p>;

  // เมื่อตรวจสอบแล้วว่าดึงข้อมูลเสร็จสมบูรณ์แล้วไม่มีโหลดและข้อผิดพลาดใด ๆ ก็ให้คืนค่าเรนเดอร์ JSX ของความคิดเห็นทั้งหมด
  // สร้าง div หลักหนึ่งตัวที่มีขอบห่างจากส่วนบน (marginTop) 0.75rem แจกเป็น Root Element
  return (
    <div style={{ marginTop: "0.75rem" }}>
      {/* ใช้แท็ก strong (ตัวหนา) เพื่อระบุหัวข้อ กำหนดให้ข้อความเป็นสี "#4a5568" */}
      <strong style={{ color: "#4a5568" }}>
        {/* ให้แสดงข้อความ ความคิดเห็น และแสดงจำนวนสมาชิกใน array ความคิดเห็นผ่าน property length ในวงเล็บ */}
        ความคิดเห็น ({comments.length})
      </strong>
      {/* นำอาร์เรย์ความคิดเห็นทั้งหมดมา map() เพื่อวนลูปสร้าง JSX Element ของรายชื่อแต่ละรายการ */}
      {comments.map((comment) => (
        <div
          // ระบุ key (จำเป็นสำหรับการ map) ให้เป็นค่าไอดีคอมเมนต์ เพื่อช่วยให้ React อัพเดต DOM ได้อย่างมีประสิทธิภาพ
          key={comment.id}
          // กำหนดรูปแบบการแสดงผลกล่องคอมเมนต์ แยกเป็น สีเทาพื้นหลัง, ขอบโค้งมน, ระยะขอบใน/นอก และขนาดฟอนต์
          style={{
            background: "#f7fafc",
            borderRadius: "6px",
            padding: "0.5rem 0.75rem",
            marginTop: "0.5rem",
            fontSize: "0.85rem",
          }}
        >
          {/* สร้าง div ส่วนแสดงชื่อผู้คอมเมนต์ โดยทำเป็นตัวอักษรหนา(bold) และเจาะจงสีเป็น "#2d3748" */}
          <div style={{ fontWeight: "bold", color: "#2d3748" }}>
            {/* ดึง property การเก็บข้อมูลชื่อ (.name) จากออบเจกต์มาครอบแสดงค่าชื่อ */}
            {comment.name}
          </div>
          {/* สร้าง div สำหรับพื้นที่เรนเดอร์เนื้อหาคอมเมนต์ และให้ข้อความใช้สี "#718096" */}
          <div style={{ color: "#718096" }}>
            {/* ดึง property ข้อความรายละเอียดใจความจริง (.body) เพื่อโชว์ข้อความความคิดเห็น */}
            {comment.body}
          </div>
        </div>
      ))}
    </div>
  );
}

// ส่งออก (export default) คอมโพเนนต์ CommentList ออกไป เพื่อให้ไฟล์ใดๆ ก็ตามสามารถนำไปใช้งาน (import)
export default CommentList;
