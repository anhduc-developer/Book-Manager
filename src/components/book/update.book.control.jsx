import { Button, Input, message, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updatedBookAPI } from "../../services/api.service";

const UpdateBookControl = (props) => {
  const { loadBooks, isOpenBookUpdate, setIsOpenBookUpdate, bookDataUpdate } =
    props;
  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [isChangeFile, setIsChangeFile] = useState(false);
  useEffect(() => {
    if (bookDataUpdate) {
      setId(bookDataUpdate._id);
      setMainText(bookDataUpdate.mainText);
      setAuthor(bookDataUpdate.author);
      setPrice(bookDataUpdate.price);
      setQuantity(bookDataUpdate.quantity);
      setCategory(bookDataUpdate.category);
      setThumbnail(bookDataUpdate.thumbnail);
    }
  }, [bookDataUpdate]);
  const [selectedFile, setUploadFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const onChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setUploadFile(null);
      setPreview(null);
      return;
    }
    const file = event.target.files[0];
    if (file) {
      setUploadFile(file);
      setPreview(URL.createObjectURL(file));
      setIsChangeFile(true);
    }
  };
  const handleUpdateBook = async () => {
    let newThumbnail = thumbnail;
    if (isChangeFile === true) {
      const resUpload = await handleUploadFile(selectedFile, "book");
      if (resUpload.data) {
        newThumbnail = resUpload.data.fileUploaded;
      } else {
        notification.error({
          message: "Error upload file",
          description: JSON.stringify(resUpload.message),
        });
        return;
      }
    }
    const resUpdateBook = await updatedBookAPI(
      id,
      newThumbnail,
      mainText,
      author,
      +price,
      +quantity,
      category,
    );
    if (resUpdateBook.data) {
      notification.success({
        message: "Update book success",
        description: "Cập nhật book thành công",
      });
      setIsOpenBookUpdate(false);
      setIsChangeFile(false);
      loadBooks();
    } else {
      notification.error({
        message: "Update book failed",
        description: JSON.stringify(resUpdateBook.message),
      });
    }
  };
  return (
    <Modal
      title="Update Book Modal"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpenBookUpdate}
      onOk={handleUpdateBook}
      onCancel={() => {
        setIsOpenBookUpdate(false);
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label>Id</label>
          <Input value={id} disabled />
        </div>
        <div>
          <label>Tiêu đề</label>
          <Input
            value={mainText}
            onChange={(event) => {
              setMainText(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Tác giả</label>
          <Input
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Giá tiền</label>
          <Input
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Số lượng</label>
          <Input
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div>
          <span>Thể loại</span>
          <br />
          <Select
            style={{ width: "100%" }}
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
          <label>Thumbnail</label>
          {preview && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  padding: "12px 0",
                  alignItems: "flex-start",
                  marginLeft: "160px",
                }}
              >
                <img
                  src={preview}
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
          <label
            htmlFor="btnUpload"
            style={{
              marginLeft: "200px",
              display: "block",
              width: "fit-content",
              padding: "10px",
              background: "lightblue",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Upload
          </label>
          <input id="btnUpload" type="file" hidden onChange={onChange} />
        </div>
      </div>
    </Modal>
  );
};
export default UpdateBookControl;
