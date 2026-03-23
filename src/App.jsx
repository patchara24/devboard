import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";

/**
 * ฟังก์ชันคอมโพเนนต์หลักของแอปพลิเคชัน (App Component)
 * ทำหน้าที่เป็นตัวจัดการเส้นทาง (Routing) ปูทางไปยังหน้า (Pages) ต่างๆ ควบคุมด้วย react-router-dom
 * และครอบแอปพลิเคชันด้วย FavoritesProvider เพื่อให้ระบบรายการโปรด (Context) ใช้งานได้ทั่วถึงทั้งแอป
 */
function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;