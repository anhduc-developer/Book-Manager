import { Button, Descriptions, Drawer, message, notification } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateUserAPI } from "../../services/api.service";

const UserDetail = (props) => {
  const { dataDetail, isDetailOpen, setIsDetailOpen, loadUsers } = props;
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
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
    console.log(">>>>", preview);
  };
  const handleUpdateUserAvatar = async () => {
    const resUpload = await handleUploadFile(selectedFile, "avatar");
    if (resUpload.data) {
      const newAvatar = resUpload.data.fileUploaded;
      const resUpdateAvatar = await updateUserAPI(
        dataDetail._id,
        dataDetail.fullName,
        dataDetail.phone,
        newAvatar,
      );
      if (resUpdateAvatar.data) {
        setIsDetailOpen(false);
        setSelectedFile(null);
        setPreview(null);
        await loadUsers();
        notification.success({
          message: "Update user avatar",
          description: "Cập nhật avatar thành công",
        });
      } else {
        notification.error({
          message: "Error update file",
          description: JSON.stringify(resUpdateAvatar.message),
        });
      }
    } else {
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message),
      });
      return;
    }
  };
  return (
    <>
      <Drawer
        width={"40vw"}
        title="User Detail"
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
                User Information
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
                <span style={{ fontWeight: 600, color: "#555" }}>
                  Full Name
                </span>
                <span style={{ color: "#333" }}>{dataDetail.fullName}</span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  padding: "12px 0",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <span style={{ fontWeight: 600, color: "#555" }}>Email</span>
                <span style={{ color: "#333" }}>{dataDetail.email}</span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  padding: "12px 0",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <span style={{ fontWeight: 600, color: "#555" }}>Phone</span>
                <span style={{ color: "#333" }}>{dataDetail.phone}</span>
              </div>

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
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
                  alt="avatar"
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    border: "3px solid #f3f3f3",
                  }}
                />
              </div>
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
                    <span style={{ fontWeight: 600, color: "#555" }}>
                      Avatar
                    </span>
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
                  <Button
                    type="primary"
                    style={{ marginLeft: "200px" }}
                    onClick={handleUpdateUserAvatar}
                  >
                    Save
                  </Button>
                </>
              )}
            </div>
            <div>
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
                Upload Avatar
              </label>
              <input
                type="file"
                hidden
                id="btnUpload"
                onChange={handleOnChange}
              />
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};
export default UserDetail;
