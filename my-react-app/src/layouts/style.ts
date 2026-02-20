import { createStyles } from "antd-style";

export const useStyles = createStyles(({css}) => ({
  shell: css`
    min-height: 100vh;
  `,

  body: css`
    padding: 24px;
  `,

  grid: css`
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 16px;
    align-items: start;
  `,

  main: css`
    min-width: 0;
  `,

  wishlist: css`
    position: sticky;
    align-self: center;
    background-color: #f0f0f0;
  `,

  wish: css`
    background-color: #e2fefa;
  `,
}))