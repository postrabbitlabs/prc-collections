import { css } from '@emotion/react';

const MatchRow = ({record,children,onClick}) => {
  return (
    <div
      onClick={onClick}
      css={css`
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        opacity: ${record.request ? 0.4 : 'unset'};
        cursor: ${record.request ? 'default' : 'pointer'};
        .right-arrow {
          display: none;
        }
        ${!record.request
          ? `&:hover {
                  background-color: #eee;
                  .right-arrow {
                    display: inline;
                  }
                }`
          : null}
      `}
    >
      {
        children
      }
    </div>
  );
};

export default MatchRow;
