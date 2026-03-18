import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(q);

  useEffect(() => {
    async function fetchPosts() {
      if (!q) {
        setPosts([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        // Using all posts for searching to emulate a basic search function
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
        const data = await res.json();
        
        const filtered = data.filter(post => 
          post.title.toLowerCase().includes(q.toLowerCase()) || 
          post.body.toLowerCase().includes(q.toLowerCase())
        );
        
        setPosts(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2 style={{ color: "#2d3748", borderBottom: "2px solid #1e40af", paddingBottom: "0.5rem" }}>
        ค้นหาจากคำว่า: "{q}"
      </h2>

      <form onSubmit={handleSearch} style={{ marginBottom: "2rem", display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="ค้นหาโพสต์..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem 0.75rem",
            border: "1px solid #cbd5e0",
            borderRadius: "6px",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#1e40af",
            color: "white",
            border: "none",
            padding: "0.5rem 1.5rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          ค้นหา
        </button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div style={{ color: "#c53030" }}>เกิดข้อผิดพลาด: {error}</div>
      ) : posts.length === 0 && q ? (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ตรงกับคำค้นหา
        </p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}

export default SearchPage;
