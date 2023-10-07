// import React from 'react';
import { DownOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
// import {postmanToAntdTreeData} from "../../../helpers";
import { css } from '@emotion/react';
import { Input, Tree } from 'antd';
// import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { useMemo } from 'react';

import { postmanToAntdTreeData } from '@/helpers';
import treeData from '@/mock.json';

import CollectionTitle from './CollectionTitle.tsx';
const CollectionMenus = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const genTreeData = useMemo(() => {
    const loop = (data: DataNode[]): DataNode[] =>
      data.map((item) => {
        const title = <CollectionTitle data={item} />;
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
        };
      });
    console.log(treeData, 'treeData');
    return loop(postmanToAntdTreeData(treeData));
  }, [treeData]);

  return (
    <div>
      <div
        className={'collection-header'}
        css={css`
          display: flex;
          padding-top: 12px;
          padding-bottom: 12px;
        `}
      >
        <span
          onClick={() => {
            // createCollection({
            //   variables: {
            //     workspaceID: params.workspaceID,
            //     parentID: '0',
            //     title: '新建文件夹',
            //   },
            // }).then((res) => {
            //   console.log(res);
            // });
          }}
          css={css`
            cursor: pointer;
            width: 24px;
          `}
        >
          <PlusOutlined />
        </span>

        <Input
          className={'collection-header-search'}
          size='small'
          placeholder=''
          prefix={<FilterOutlined />}
          onChange={() => {}}
        />
      </div>
      <Tree
        blockNode={true}
        motion={false}
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandAll
        onSelect={onSelect}
        treeData={genTreeData}
      />
    </div>
  );
};

export default CollectionMenus;
