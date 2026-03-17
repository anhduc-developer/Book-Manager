import { Button, Drawer } from "antd";

const BookDetail = (props) => {
  const {
    isDetailOpen,
    setIsDetailOpen,
    dataDetail,
    setDataDetail,
    loadBooks,
  } = props;
  return (
    <Drawer
      width={"40vw"}
      title="Book Detail"
      closable={{ "aria-label": "Close Button" }}
      onClose={() => {
        setIsDetailOpen(false);
      }}
      open={isDetailOpen}
    >
      {dataDetail && (
        <>
          <div
            style={{
              maxWidth: "600px",
              margin: "30px auto",
              padding: "24px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                fontSize: "22px",
                fontWeight: "600",
                color: "#222",
                borderBottom: "2px solid #f0f0f0",
                paddingBottom: "10px",
              }}
            >
              Book Information
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ fontWeight: 600, color: "#555" }}>ID</span>
              <span style={{ color: "#333" }}>{dataDetail._id}</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ fontWeight: 600, color: "#555" }}>Tiêu đề</span>
              <span style={{ color: "#333" }}>{dataDetail.mainText}</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ fontWeight: 600, color: "#555" }}>Tác giả</span>
              <span style={{ color: "#333" }}>{dataDetail.author}</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ fontWeight: 600, color: "#555" }}>Giá</span>
              <span style={{ color: "#333" }}>
                {Intl.NumberFormat(`vi-VN`, {
                  style: "currency",
                  currency: "VND",
                }).format(dataDetail.price)}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ fontWeight: 600, color: "#555" }}>Đã bán</span>
              <span style={{ color: "#333" }}>{dataDetail.sold}</span>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  padding: "12px 0",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <span style={{ fontWeight: 600, color: "#555" }}>Số lượng</span>
                <span style={{ color: "#333" }}>{dataDetail.quantity}</span>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ fontWeight: 600, color: "#555" }}>Danh mục</span>
              <span style={{ color: "#333" }}>{dataDetail.category}</span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ fontWeight: 600, color: "#555" }}>CreatedAt</span>
              <span style={{ color: "#333" }}>{dataDetail.createdAt}</span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ fontWeight: 600, color: "#555" }}>UpdatedAt</span>
              <span style={{ color: "#333" }}>{dataDetail.updatedAt}</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                padding: "12px 0",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontWeight: 600, color: "#555" }}>Ảnh</span>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`}
                alt="ảnh"
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  border: "3px solid #f3f3f3",
                }}
              />
            </div>
          </div>
        </>
      )}
    </Drawer>
  );
};
export default BookDetail;
