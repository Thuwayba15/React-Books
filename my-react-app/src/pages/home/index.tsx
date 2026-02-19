import { Card, Input, Typography, Row, Col, Space, Empty } from "antd";

const { Title, Text } = Typography;

export const Home = () => {
    const fakeResults: Array<{ id: string; title: string; author: string }> = [];

    return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Title level={2} style={{ margin: 0 }}>
          Search Books
        </Title>
        <Text type="secondary">
          Search
        </Text>
      </div>

      <Input.Search
        placeholder="Search by title, author, keyword..."
        enterButton="Search"
        size="large"
        onSearch={() => {
          /* no-op for now */
        }}
      />

      {fakeResults.length === 0 ? (
        <Card>
          <Empty description="No results yet" />
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {fakeResults.map((b) => (
            <Col key={b.id} xs={24} sm={12} md={8} lg={6}>
              <Card hoverable title={b.title}>
                <Text type="secondary">{b.author}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Space>
  );
}