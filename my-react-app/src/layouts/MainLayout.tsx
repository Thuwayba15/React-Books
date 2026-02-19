import { Layout, Menu } from 'antd';
import { BookOutlined, CompassOutlined, LoginOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

export const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedKey =
        location.pathname === "/something-new"
        ? "/something-new"
        : location.pathname === "/"
            ? "/"
            : "";

    return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div style={{ color: "white", fontWeight: 700, marginRight: 20 }}>
          BookShelf
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={[
            { 
                key: "/", 
                icon: <BookOutlined />, 
                label: "Home" },
            {
              key: "/something-new",
              icon: <CompassOutlined />,
              label: "Something New",
            },
            { 
                key: "/login", 
                icon: <LoginOutlined />, 
                label: "Login" },
          ]}
          onClick={(e) => navigate(e.key)}
          style={{ flex: 1 }}
        />
      </Header>

      <Content style={{ padding: 24 }}>
        <Outlet />
      </Content>
    </Layout>
  );
}