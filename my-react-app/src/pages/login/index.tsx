import { Card, Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export const Login = () => {
    const navigate = useNavigate();

    return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <Card style={{ width: 380 }} bordered>
        <Title level={3} style={{ marginTop: 0 }}>
          Login
        </Title>
        <Text type="secondary">
          Login to get started.
        </Text>

        <Form layout="vertical" style={{ marginTop: 20 }}>
          <Form.Item label="Email">
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item label="Password">
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Button 
            type="primary" 
            block
            onClick={() => navigate("/home")}>
            Sign in
          </Button>
        </Form>
      </Card>
    </div>
  );
}