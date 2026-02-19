import { Alert, Card, Input, Typography, Row, Col, Space, Spin } from "antd";
import { useBooksActions, useBooksState } from "../../providers/books";

const { Title, Text } = Typography;

export const Home = () => {
    const {searchBooks} = useBooksActions();
    const { books, isPending, isError, errorMessage, query, total } = useBooksState();

    return (
    <Space orientation="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Title level={2} style={{ margin: 0 }}>
          Search Books 
        </Title>
        <Text type="secondary">
          Results: {query ? `${total} found for "${query}"` : "Type a search term"}
        </Text>
      </div>

      <Input.Search
        placeholder="Search by title, author, keyword..."
        enterButton="Search"
        size="large"
        onSearch={(value) => searchBooks(value)}
      />

      {isError && errorMessage && <Alert type="error" message={errorMessage} showIcon />}

      {isPending ? (
        <Card><Spin /></Card>
      ) : (
        <Row gutter={[16, 16]}>
          {books.map((b) => (
            <Col key={b.key} xs={24} sm={12} md={8}>
              <Card hoverable title={b.title}>
                <Text type="secondary">{b.authorName}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Space>
  );
}