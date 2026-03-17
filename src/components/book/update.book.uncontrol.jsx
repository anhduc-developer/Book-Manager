import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Select,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updatedBookAPI } from "../../services/api.service";

const UpdateBookUncontrol = (props) => {
  const { loadBooks, isOpenBookUpdate, setIsOpenBookUpdate, bookDataUpdate } =
    props;
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const [isChangeFile, setIsChangeFile] = useState(false);
  useEffect(() => {
    if (bookDataUpdate) {
      form.setFieldsValue({
        id: bookDataUpdate._id,
        mainText: bookDataUpdate.mainText,
        author: bookDataUpdate.author,
        price: bookDataUpdate.price,
        quantity: bookDataUpdate.quantity,
        category: bookDataUpdate.category,
      });
    }
  }, [bookDataUpdate]);

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
      setIsChangeFile(true);
    }
  };
  const handleUpdateBook = async (values) => {
    let newThumbnail = values.thumbnail;
    if (isChangeFile) {
      const resUpload = await handleUploadFile(selectedFile, "book");
      if (resUpload.data) {
        newThumbnail = resUpload.data.fileUploaded;
      } else {
        notification.error({
          message: "Upload file failed",
          description: JSON.stringify(resUpload.message),
        });
        return;
      }
    }
    const resUpdateBook = await updatedBookAPI(
      values.id,
      newThumbnail,
      values.mainText,
      values.author,
      +values.price,
      +values.quantity,
      values.category,
    );
    if (resUpdateBook.data) {
      notification.success({
        message: "Update Book success",
        description: "Cập nhật book thành công",
      });
      setIsOpenBookUpdate(false);
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
      title="Update Book"
      open={isOpenBookUpdate}
      footer={null}
      onCancel={() => setIsOpenBookUpdate(false)}
    >
      <Form
        form={form}
        name="control-hooks"
        style={{
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        layout="vertical"
        onFinish={handleUpdateBook}
      >
        <Form.Item name="id" label="ID" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="mainText" label="Tiêu đề" rules={[{ required: true }]}>
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
        <Form.Item>
          <div style={{ marginLeft: "310px" }}>
            <Button
              htmlType="button"
              onClick={() => {
                setIsOpenBookUpdate(false);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </Form.Item>
      </Form>

      <input type="file" hidden id="btnUpload" onChange={handleOnChange} />
    </Modal>
  );
};
export default UpdateBookUncontrol;
