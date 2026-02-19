import { Alert, Card, Input, Typography, Row, Col, Space, Spin, Image, Pagination } from "antd";
import { useBooksActions, useBooksState } from "../../providers/books";

const { Title, Text } = Typography;

export const Home = () => {
    const {searchBooks} = useBooksActions();
    const { books, isPending, isError, errorMessage, query, total, page, limit} = useBooksState();

    return (
    <Space orientation="vertical" size="large" style={{ width: "100%" }}>
      <div>
        <Title level={2} style={{ margin: 0 }}>
          Search Books 
        </Title>
      </div>

      <Input.Search
        placeholder="Search by title, author, keyword..."
        enterButton="Search"
        size="large"
        onSearch={(value) => searchBooks(value)}
      />

      {isError && errorMessage && <Alert type="error" title={errorMessage} showIcon />}

      {isPending ? (
        <Card><Spin /></Card>
      ) : (
        <>
        <Row gutter={[16, 16]}>
          {books.map((b) => (
            <Col key={b.key} xs={24} sm={12} md={8}>
              <Card hoverable>
                  <div style={{ display: "flex", gap: 12 }}>
                    <Image
                      src={b.coverUrl}
                      width={70}
                      height={100}
                      style={{ objectFit: "cover", borderRadius: 6 }}
                      preview={true}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>{b.title}</div>
                      <Text type="secondary">{b.authorName}</Text>
                    </div>
                  </div>
                </Card>
            </Col>
          ))}
        </Row>
        {query && total > 0 && (
            <Pagination
              current={page}
              pageSize={limit}
              total={total}
              showSizeChanger={false}
              onChange={(nextPage) => searchBooks(query, nextPage)}
            />
          )}
        </>
      )}
    </Space>
  );
}