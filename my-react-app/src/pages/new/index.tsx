import { Card, Typography, Space } from "antd";

const { Title, Text } = Typography;

const mockBooks = [
  { id: "1", title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: "2", title: "Pride and Prejudice", author: "Jane Austen" },
  { id: "3", title: "Dune", author: "Frank Herbert" },
];

export const SomethingNew = () => {
    return (
    <Space orientation="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Title level={2} style={{ margin: 0 }}>
          Something New
        </Title>
        <Text type="secondary">
          Can't choose? Let us help!
        </Text>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          paddingBottom: 6,
        }}
      >
        {mockBooks.map((b) => (
          <Card
            key={b.id}
            hoverable
            style={{ minWidth: 260, flex: "0 0 auto" }}
            title={b.title}
          >
            <Text type="secondary">{b.author}</Text>
          </Card>
        ))}
      </div>
    </Space>
  );
}