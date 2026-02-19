import { Alert, Checkbox, Form, Input, Button, Card, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthActionContext } from "../../providers/auth/context";
import { useEffect } from "react";
import { useAuthActions, useAuthState } from "../../providers/auth/index";


const { Title, Text } = Typography;

export const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuthActions();
    const auth = useAuthState();

   useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/home", { replace: true });
        }
    }, [auth.isAuthenticated, navigate]);

    return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <Card style={{ width: 380 }} >
        <Space orientation="vertical" size={8} style={{ width: "100%" }}>
          <Title level={3} style={{ margin: 0 }}>Login</Title>
          <Text type="secondary">Default credentials: demo@user.com / demo123</Text>

          {auth.isError && auth.errorMessage && (
            <Alert type="error" title={auth.errorMessage} showIcon />
          )}
        </Space>

        <Form
          layout="vertical"
          style={{ marginTop: 16 }}
          onFinish={(values) => {
            login(values.email, values.password);
            // navigate after login success (see next step)
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter an email" }]}
          >
            <Input placeholder="demo@user.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Button 
            type="primary" 
            block
            htmlType="submit">
            Sign in
          </Button>
        </Form>
      </Card>
    </div>
  );
}