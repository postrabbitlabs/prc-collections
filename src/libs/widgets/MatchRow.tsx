import { css } from '@emotion/react';

const MatchRow = ({ record, children, onClick, allowTypes }) => {
  return (
    <div
      onClick={allowTypes.includes(record.type)?onClick:null}
      css={css`
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        opacity: ${!allowTypes.includes(record.type) ? 0.4 : 'unset'};
        cursor: ${!allowTypes.includes(record.type) ? 'default' : 'pointer'};
        .right-arrow {
          display: none;
        }
        ${allowTypes.includes(record.type)
          ? `&:hover {
                  background-color: #eee;
                  .right-arrow {
                    display: inline;
                  }
                }`
          : null}
      `}
    >
      {children}
    </div>
  );
};

export default MatchRow;
