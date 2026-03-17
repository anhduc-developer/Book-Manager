import { Button, Card, Col, Form, Input, notification, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router";
import "../styles/register.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form1] = useForm();

  const onFinish = async (values) => {
    const res = await registerUserAPI(
      values.fullName,
      values.email,
      values.password,
      values.phone,
    );

    if (res.data) {
      notification.success({
        message: "Register user",
        description: "Đăng ký user thành công!",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Register user failed",
        description: JSON.stringify(res.message),
      });
    }
  };

  return (
    <div className="register-container">
      <Card title="ĐĂNG KÝ TÀI KHOẢN" className="register-card">
        <Form layout="vertical" form={form1} onFinish={onFinish}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input your fullName!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                pattern: new RegExp(/\d+/g),
                message: "Wrong format!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Row justify="space-between">
              <Button
                type="primary"
                onClick={() => {
                  form1.submit();
                }}
              >
                Register
              </Button>
            </Row>
          </Form.Item>
          <div>
            <span>
              Đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link>
            </span>
          </div>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button">Reset</Button>
              <Button type="link" htmlType="button">
                Fill form
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
