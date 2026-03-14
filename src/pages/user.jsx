import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUserAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    const res = await fetchAllUserAPI();
    setData(res.data.reverse());
  };
  return (
    <div style={{ padding: "20px" }}>
      <UserForm loadUsers={loadUsers} />
      <UserTable loadUsers={loadUsers} data={data} />
    </div>
  );
};
export default UserPage;
