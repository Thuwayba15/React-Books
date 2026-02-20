import { Alert, Card, Input, Typography, Row, Col, Space, Spin, Pagination } from "antd";
import { BookCard } from "../../components/bookcard/BookCard"
import { useBooksActions, useBooksState } from "../../providers/books";
import { useWishlistActions } from "../../providers/wishlist";
import withAuthGuard from "../../hoc/withAuth";

const { Title } = Typography;


const Home = () => {
    const {searchBooks} = useBooksActions();
    const { books, isPending, isError, errorMessage, query, total, page, limit} = useBooksState();
    const { addToWishlist } = useWishlistActions();

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
              <BookCard
                keyId={b.key}
                title={b.title}
                authorName={b.authorName}
                coverUrl={b.coverUrl || ""}
                onAddToWishlist={() =>
                  addToWishlist({
                    key: b.key,
                    title: b.title,
                    authorName: b.authorName,
                  })
                }
              />
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

export default withAuthGuard(Home);