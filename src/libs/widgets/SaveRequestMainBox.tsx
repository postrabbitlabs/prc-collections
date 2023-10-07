import { css } from '@emotion/react';
import { theme } from 'antd';
const { useToken } = theme;
const SaveRequestMainBox = ({ children }) => {
  const { token } = useToken();
  return (
    <div
      css={css`
        border: 1px solid ${token.colorBorder};
        border-bottom-left-radius: ${token.borderRadius}px;
        border-bottom-right-radius: ${token.borderRadius}px;
        border-top: none;
        height: 360px;
        margin-bottom: 30px;
        padding-top: 5px;
        overflow-y: auto;
      `}
    >
      {children}
    </div>
  );
};

export default SaveRequestMainBox;
