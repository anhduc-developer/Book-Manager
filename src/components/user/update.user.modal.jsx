import { Input, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";
const UpdateUserModal = (props) => {
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadUsers,
  } = props;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);
  const handleUpdateUser = async () => {
    const res = await updateUserAPI(id, fullName, phone, avatar);
    if (res.data) {
      notification.success({
        message: "Update user",
        description: "Update user thành công",
      });
      resetAndCloseModal();
      await loadUsers();
    } else {
      notification.error({
        message: "Error create user",
        description: JSON.stringify(res.message),
      });
    }
  };
  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setFullName("");
    setPhone("");
    setId("");
    setDataUpdate(null);
  };
  return (
    <>
      <Modal
        title="Update User"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalUpdateOpen}
        onOk={handleUpdateUser}
        onCancel={() => {
          resetAndCloseModal();
        }}
        maskClosable={false}
        okText={"SAVE"}
      >
        <div>
          <span>Id</span>
          <Input value={id} disabled={true} />
        </div>
        <div>
          <span>FullName</span>
          <Input
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Phone number</span>
          <Input
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
      </Modal>
    </>
  );
};
export default UpdateUserModal;
