import { css } from '@emotion/react';
import { theme } from 'antd';
const { useToken } = theme;
const SaveRequestDivider = () => {
  const {token} = useToken();
  return (
    <div
      css={css`
        height: 5px;
        border: 1px solid ${token.colorBorder};
        border-top: none;
        border-bottom: none;
        margin-top: -5px;
      `}
    />
  );
};

export default SaveRequestDivider;
