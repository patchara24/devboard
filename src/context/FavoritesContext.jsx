import { createContext, useContext, useState, useEffect } from "react";

// 1. สร้าง context object
const FavoritesContext = createContext();

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

// 3. Custom hook สำหรับใช้งาน context ง่าย ๆ
export function useFavorites() {
  return useContext(FavoritesContext);
}
