export default function PostCount({ posts }) {
    return (
        <div>
            <h4>
                โพสต์ทั้งหมด: {posts.length} รายการ
            </h4>
        </div>
    );
}