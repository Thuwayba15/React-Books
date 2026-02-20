import { Layout, Menu, Card, Typography, Empty, Button, List, Space, Tag, Switch } from "antd";
import { BookOutlined, CompassOutlined, LogoutOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStyles } from "./style";
import { useAuthActions } from "../providers/auth";
import { useWishlistActions, useWishlistState } from "../providers/wishlist";
import withAuthGuard from "../hoc/withAuth";

const { Header, Content } = Layout;
const { Text } = Typography;

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { styles } = useStyles();
    const { logout } = useAuthActions();
    const { items } = useWishlistState();
    const { removeFromWishlist, toggleRead } = useWishlistActions();
    
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
                key: "/logout", 
                icon: <LogoutOutlined />, 
                label: "Logout" },
          ]}
          onClick={(e) => {
            if (e.key === "/logout") {
                logout();
                navigate("/login", { replace: true });
                return;
            }
            navigate(e.key);
          }}
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
              {!items.length ? (
                <Empty description="Wishlist is empty" />
              ) : (
                <List
                  itemLayout="vertical"
                  dataSource={items}
                  renderItem={(item) => (
                    <List.Item
                      key={item.key}
                      actions={[
                        <Space key="actions" size="middle">
                          <Switch
                            checked={item.isRead}
                            onChange={() => toggleRead(item.key)}
                            checkedChildren="Read"
                            unCheckedChildren="Unread"
                          />
                          {/* @ts-ignore */}
                          <Button danger size="small" key="add" onClick={() => removeFromWishlist(item.key)}>
                            Remove
                          </Button>
                        </Space>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Space>
                            <span style={{ fontWeight: 600 }}>{item.title}</span>
                            {item.isRead ? <Tag color="green">Read</Tag> : <Tag>Unread</Tag>}
                          </Space>
                        }
                        description={item.authorName}
                      />
                    </List.Item>
                  )}
                />
              )}

              <div style={{ marginTop: 12 }}>
                <Text type="secondary">
                  Tip: click a book card to add it here.
                </Text>
              </div>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default withAuthGuard(MainLayout);