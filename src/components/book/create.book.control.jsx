import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const BookForm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const { loadBooks } = props;
  const handleOnChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleCreateBook = async () => {
    const resUpload = await handleUploadFile(selectedFile, "book");
    if (resUpload.data) {
      const newThumbnail = resUpload.data.fileUploaded;
      const resCreateBook = await createBookAPI(
        newThumbnail,
        mainText,
        author,
        price,
        quantity,
        category,
      );
      if (resCreateBook.data) {
        setSelectedFile(null);
        setPreview(null);
        notification.success({
          message: "Create Book success",
          description: "Tạo mới book thành công",
        });
        setIsModalOpen(false);
        loadBooks();
      } else {
        notification.error({
          message: "Error create Book",
          description: JSON.stringify(resCreateBook.message),
        });
      }
    } else {
      notification.error({
        message: "Bạn phải upload file",
        description: JSON.stringify(resUpload.message),
      });
      return;
    }
  };
  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table Book</h3>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
          }}
          style={{ backgroundColor: "green" }}
        >
          Create Book
        </Button>
      </div>
      <Modal
        title="Create Book"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleCreateBook}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        maskClosable={false}
        okText={"CREATE"}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <span>Tiêu đề</span>
          <Input
            value={mainText}
            onChange={(event) => {
              setMainText(event.target.value);
            }}
          />
          <span>Tác giả</span>
          <Input
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
          />
          <span
            style={{ fontWeight: 600, marginBottom: "6px", display: "block" }}
          >
            Giá tiền
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #d9d9d9",
              borderRadius: "6px",
              padding: "4px 8px",
              width: "250px",
            }}
          >
            <InputNumber
              onChange={(value) => {
                setPrice(value);
              }}
              min={0}
              value={price}
              style={{ flex: 1, border: "none", boxShadow: "none" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
              parser={(value) => value.replace(/\./g, "")}
            />
            <span
              style={{
                marginLeft: "6px",
                fontWeight: 600,
                color: "#555",
              }}
            >
              đ
            </span>
          </div>
          <span>Số lượng</span>
          <Input
            value={quantity}
            onChange={(event) => {
              setQuantity(+event.target.value);
            }}
          />
          <span>Thể loại</span>
          <Select
            value={category}
            onChange={(value) => setCategory(value)}
            options={[
              { value: "Arts", label: "Arts" },
              { value: "Business", label: "Business" },
              { value: "Comics", label: "Comics" },

              { value: "Cooking", label: "Cooking" },
              { value: "Entertainment", label: "Entertainment" },
              { value: "History", label: "History" },

              { value: "Music", label: "Music" },
              { value: "Sports", label: "Sports" },
              { value: "Teen", label: "Teen" },
              { value: "Travel", label: "Travel" },
            ]}
          />
        </div>
        <div>
          <span style={{ marginLeft: "180px" }}>Ảnh thumbnail</span>

          <label
            htmlFor="btnUpload"
            style={{
              marginLeft: "200px",
              display: "block",
              width: "fit-content",
              marginTop: "15px",
              padding: "5px 10px",
              background: "lightblue",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Upload
          </label>
          {preview && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  padding: "12px 0",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontWeight: 600, color: "#555" }}>Avatar</span>
                <img
                  src={preview}
                  alt="avatar"
                  style={{
                    marginBottom: "15px",
                    width: "140px",
                    height: "140px",
                    objectFit: "cover",
                    border: "3px solid #f3f3f3",
                  }}
                />
              </div>
            </>
          )}
          <input type="file" hidden id="btnUpload" onChange={handleOnChange} />
        </div>
      </Modal>
    </div>
  );
};
export default BookForm;
