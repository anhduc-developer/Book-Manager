import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, notification, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { Link } from "react-router-dom";
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router";
const LoginPage = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values);
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
              label="Full Name"
              name="fullName"
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
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Row justify="space-between">
                <Button
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
