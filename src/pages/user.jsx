import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUserAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    const res = await fetchAllUserAPI(current, pageSize);
    if (res.data) {
      setData(res.data.result.reverse());
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <UserForm loadUsers={loadUsers} />
      <UserTable
        loadUsers={loadUsers}
        data={data}
        current={current}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
        pageSize={pageSize}
        total={total}
      />
    </div>
  );
};
export default UserPage;
