import { Layout, Menu, Card, Typography, Empty } from "antd";
import { BookOutlined, CompassOutlined, LogoutOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStyles } from "./style";

const { Header, Content } = Layout;
const { Text } = Typography;

export const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { styles } = useStyles();
    
    const selectedKey =
        location.pathname === "/something-new"
        ? "/something-new"
        : location.pathname === "/home"
            ? "/home"
            : "/home";

    return (
    <Layout className={styles.shell}>
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
                key: "/home", 
                icon: <BookOutlined />, 
                label: "Home" },
            {
              key: "/something-new",
              icon: <CompassOutlined />,
              label: "Something New",
            },
            { 
                key: "/login", 
                icon: <LogoutOutlined />, 
                label: "Logout" },
          ]}
          onClick={(e) => navigate(e.key)}
          style={{ flex: 1 }}
        />
      </Header>

      <Content className={styles.body}>
        <div className={styles.grid}>
          <div className={styles.main}>
            <Outlet />
          </div>

          {/* Right-side Wishlist (UI only) */}
          <div className={styles.wishlist}>
            <Card
              title="Wishlist"
            >
              <Empty description="Wishlist is empty" />
              <div style={{ marginTop: 12 }}>
                <Text type="secondary">
                  Later: add/remove books
                </Text>
              </div>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
}