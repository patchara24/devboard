import { createContext, useContext, useState, useEffect } from "react";

// 1. สร้าง context object
const FavoritesContext = createContext();

/**
 * คอมโพเนนต์ FavoritesProvider (Context Provider)
 * ทำหน้าที่เสมือนโกดังกลางเก็บและจัดการ State จัดเก็บ "รายการโปรด" (favorites) แบบ Global (ส่วนกลาง)
 * พร้อมแบ่งปันข้อมูลและฟังก์ชันสลับเปลี่ยนรายการโปรด (toggleFavorite) ให้คอมโพเนนต์ลูกหลานใช้งาน
 * และมีการเก็บข้อมูลลง localStorage เพื่อไม่ให้ข้อมูลหายตอนรีเฟรชอัติโนมัติ
 */
// 2. Provider component — ครอบ App ทั้งหมด
export function FavoritesProvider({ children }) {
  // เริ่มต้นด้วยการอ่านจาก localStorage (Level 3 Challenge)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // ถอด/เพิ่มรายการลง favorites
  function toggleFavorite(postId) {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  }

  // เซฟลง localStorage ทุกครั้งที่ state เปลี่ยน (Level 3 Challenge)
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Custom Hook สำหรับเรียกใช้งานเมกะสโตร์ (Context) ของรายการโปรดอย่างสะดวก
 * ช่วยให้คอมโพเนนต์ต่างๆ อ่านค่า favorites หรือเรียกใช้แพ็กเกจในคอนเท็กซ์ได้ทันทีโดยไม่ต้องไป useContext ดิบๆ
 */
// 3. Custom hook สำหรับใช้งาน context ง่าย ๆ
export function useFavorites() {
  return useContext(FavoritesContext);
}
