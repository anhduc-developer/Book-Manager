import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
} from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookUncontrol = (props) => {
  const { loadBooks } = props;
  const [form] = Form.useForm();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();
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
  const handleCreateBook = async (value) => {
    const resUpload = await handleUploadFile(selectedFile, "book");
    if (resUpload.data) {
      const thumbnail = resUpload.data.fileUploaded;
      const resCreateBook = await createBookAPI(
        thumbnail,
        value.mainText,
        value.author,
        +value.price,
        +value.quantity,
        value.category,
      );
      if (resCreateBook.data) {
        setSelectedFile(null);
        setPreview(null);
        loadBooks();
        notification.success({
          message: "Create Book success",
          description: "Tạo mới book thành công",
        });
        setIsOpenForm(false);
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
    <div style={{ margin: "20px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table Books</h3>
        <Button
          type="primary"
          onClick={() => {
            setIsOpenForm(true);
          }}
          style={{ backgroundColor: "green" }}
        >
          Create Book
        </Button>
      </div>
      <Modal
        title="Create Book"
        open={isOpenForm}
        footer={null}
        onCancel={() => setIsOpenForm(false)}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={handleCreateBook}
          style={{
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          <Form.Item
            name="mainText"
            label="Tiêu đề"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="author" label="Tác giả" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá tiền" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} addonAfter="đ" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="category"
            label="Thể loại"
            rules={[{ required: true }]}
          >
            <Select
              allowClear
              placeholder="Chọn thể loại"
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
          </Form.Item>
          <span style={{ marginLeft: "180px" }}>Ảnh thumbnail</span>
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
          <Form.Item>
            <div style={{ marginLeft: "310px" }}>
              <Button
                htmlType="button"
                onClick={() => {
                  setIsOpenForm(false);
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                CREATE
              </Button>
            </div>
          </Form.Item>
        </Form>

        <input type="file" hidden id="btnUpload" onChange={handleOnChange} />
      </Modal>
    </div>
  );
};
export default CreateBookUncontrol;
