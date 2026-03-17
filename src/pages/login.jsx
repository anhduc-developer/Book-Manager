import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, notification, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { Link } from "react-router-dom";
import { loginAPI, registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";
const LoginPage = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const onFinish = async (values) => {
    setLoading(true);
    const res = await loginAPI(values.email, values.password);
    if (res.data) {
      message.success("ĐĂNG NHẬP THÀNH CÔNG");
      localStorage.setItem("access_token", res.data.access_token);
      setUser(res.data.user);
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
      notification.error({
        message: "Error Login",
        description: JSON.stringify(res.message),
      });
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#391965",
        }}
      >
        <Card title="ĐĂNG NHẬP" style={{ width: "500px" }}>
          <Form
            layout="vertical"
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your fullName!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/\d+/g),
                  message: "Wrong format!",
                },
              ]}
            >
              <Input.Password
                onKeyDown={(event) => {
                  if (event.key === "Enter") form.submit();
                }}
              />
            </Form.Item>
            <Form.Item>
              <Row justify="space-between">
                <Button
                  loading={loading}
                  type="primary"
                  onClick={() => {
                    form.submit();
                  }}
                >
                  Login
                </Button>
                <Link to={"/"}>Go to homepage</Link>
              </Row>
            </Form.Item>
            <span style={{ marginLeft: "100px" }}>
              Chưa có tài khoản?{" "}
              <Link to="/register">
                Đăng ký tại đây <ArrowRightOutlined />{" "}
              </Link>
            </span>
          </Form>
        </Card>
      </div>
    </>
  );
};
export default LoginPage;
