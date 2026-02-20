import { createStyles, css } from "antd-style";


export const useStyles = createStyles({
  card: css`
    cursor: pointer;
    background-color: #d9c3db;
    .ant-card-body {
      padding: 12px;
    }
  `,

  row: css`
    display: flex;
    gap: 20px;
    align-items: flex-start;
  `,

  cover: css`
    width: 70px;
    height: 100px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
  `,

  info: css`
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,

  title: css`
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  author: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(172, 145, 176);
  `,
});