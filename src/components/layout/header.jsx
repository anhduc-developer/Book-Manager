import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  BookOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Children, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
const Header = () => {
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "mail",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/users">Users</Link>,
      key: "users",
      icon: <UserOutlined />,
    },
    {
      label: <Link to="/books">Books</Link>,
      key: "books",
      icon: <BookOutlined />,
    },
    {
      label: "TÀI KHOẢN",
      key: "account",
      icon: <SettingOutlined />,
      children: [
        { key: "login", label: <Link to="/login">ĐĂNG NHẬP</Link> },
        {
          key: "register",
          label: <Link to="/register">Đăng Ký Tài Khoản</Link>,
        },
      ],
    },
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default Header;
