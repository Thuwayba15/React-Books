import { Card, Image, Typography } from "antd";
import React from "react";
import { useStyles } from "./style";

const { Text } = Typography;

export interface BookCardProps {
  keyId: string;
  title: string;
  authorName: string;
  coverUrl: string;
  onAddToWishlist?: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  title,
  authorName,
  coverUrl,
  onAddToWishlist,
}) => {
  const { styles } = useStyles();

  return (
    // @ts-ignore
    <Card hoverable onClick={onAddToWishlist} className={styles.card}>
      <div className={styles.row}>
        <Image
          src={coverUrl}
          width={70}
          height={100}
          className={styles.cover}
          preview
        />
        <div className={styles.info}>
          <div className={styles.title} title={title}>
            {title}
          </div>
          <Text className={styles.author} title={authorName}>
            {authorName}
          </Text>
        </div>
      </div>
    </Card>
  );
};