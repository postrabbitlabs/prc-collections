import { FolderOutlined, SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Breadcrumb, Button, Input, InputRef, Modal, Space, Spin, theme, Typography } from 'antd';
import { FC, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

// import { ItemType, TreeNode } from './token.ts';
import RequestItemDisplay from './widgets/RequestItemDisplay.tsx';
import {TreeNode,ItemType} from "@/remocollab/prc-base/token.ts";

function findNodeByKey(tree: TreeNode[], nameToFind: string): TreeNode | null {
  for (const node of tree) {
    if (node.key === nameToFind) {
      return node; // 如果找到匹配的节点，返回该节点
    }
    if (node.item) {
      const foundNode = findNodeByKey(node.item, nameToFind); // 递归搜索子节点
      if (foundNode) {
        return foundNode; // 如果在子节点中找到匹配的节点，返回该节点
      }
    }
  }
  return null; // 如果没有找到匹配的节点，返回 null
}

function findPathByKey(
  tree: TreeNode[],
  nameToFind: string,
  currentPath: { name: string; key: string }[] = [],
): any[] | null {
  for (const [_, node] of tree.entries()) {
    const nodePath = [
      ...currentPath,
      {
        key: node.key,
        name: node.name,
      },
    ]; // 更新当前节点的路径

    if (node.key === nameToFind) {
      return nodePath; // 如果找到匹配的节点，返回路径
    }

    if (node.item) {
      const foundPath = findPathByKey(node.item, nameToFind, nodePath); // 递归搜索子节点
      if (foundPath) {
        return foundPath; // 如果在子节点中找到匹配的节点，返回路径
      }
    }
  }

  return null; // 如果没有找到匹配的节点，返回 null
}

const { Text } = Typography;
const { useToken } = theme;
interface FooterProps {
  onClose: () => void;
  onSave: () => void;
  onNewFolder: () => void;
}
const Footer: FC<FooterProps> = ({ onClose, onSave, onNewFolder }) => {
  const token = useToken();
  const { t } = useTranslation();
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          color: ${token.token.colorTextSecondary};
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        `}
        onClick={() => {
          onNewFolder();
        }}
      >
        {t('new.folder')}
      </div>

      <Space>
        <Button type={'primary'} onClick={onSave}>
          {t('save')}
        </Button>
        <Button
          onClick={() => {
            onClose();
          }}
        >
          {t('cancel')}
        </Button>
      </Space>
    </div>
  );
};

interface SaveRequestModalProps {
  open: boolean;
  requestName: string;
  treeData: TreeNode[];
  onSave: (folderKey: string, requestName: string) => void;
  onCreateFolder: (newFolderName: string, parentFolderKey: string) => Promise<string>;
  onClose: () => void;
}

const SaveRequestModal: FC<SaveRequestModalProps> = ({
                                                       open,
                                                       treeData,
                                                       requestName,
                                                       onCreateFolder,
                                                       onSave,
                                                       onClose,
                                                     }) => {
  const [newFolderMode, setNewFolderMode] = useState(false);
  const [loding, setLoding] = useState(false);
  const requestNameInputRef = useRef<InputRef>(null);
  const folderNameInputRef = useRef<InputRef>(null);
  const token = useToken();
  const { t } = useTranslation();
  const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);
  const selectedTreeData = useMemo(() => {
    // 这里不能引用传递
    let zuizhong = [];
    if (selectedKey) {
      zuizhong = findNodeByKey(treeData, selectedKey)?.item || treeData;
    } else {
      zuizhong = treeData;
    }
    if (loding) {
      return zuizhong.concat({ name: 'test', key: 'key', added: true });
    }
    return zuizhong;
  }, [treeData, selectedKey, loding]);

  return (
    <Modal
      centered
      title={t('shortcut.request.save_request')}
      width={650}
      open={open}
      footer={
        <Footer
          onNewFolder={() => {
            setNewFolderMode(true);
          }}
          onClose={onClose}
          onSave={() => {
            onSave(selectedKey, requestNameInputRef?.current?.input?.value || '');
          }}
        />
      }
      closeIcon={false}
      onCancel={() => {
        onClose();
      }}
    >
      <div
        css={css`
          margin-bottom: 20px;
        `}
      >
        <Text
          type={'secondary'}
          strong
          css={css`
            display: block;
            padding: 10px 0;
          `}
        >
          {t('save.name')}
        </Text>
        <Input defaultValue={requestName} ref={requestNameInputRef} />
      </div>

      <Space
        css={css`
          margin-bottom: 10px;
        `}
      >
        <span
          css={css`
            color: rgb(107, 107, 107);
            font-weight: 500;
          `}
        >
          {t('save.to')}
        </span>
        <span
          css={css`
            color: rgb(166, 166, 166);
            display: flex;
          `}
        >
          {selectedKey ? (
            <Breadcrumb
              items={(findPathByKey(treeData, selectedKey) || []).map((i, index) => {
                if (index < (findPathByKey(treeData, selectedKey) || []).length - 1) {
                  return {
                    title: (
                      <span
                        css={css`
                          &:hover {
                            text-decoration: underline;
                            cursor: pointer;
                          }
                        `}
                      >
                        {i.name}
                      </span>
                    ),
                    onClick: () => setSelectedKey(i.key),
                  };
                }
                return { title: i.name };
              })}
            />
          ) : (
            <Text type={'secondary'}>{t('select.folder')}</Text>
          )}
        </span>
      </Space>

      <Input placeholder={t('search.folder')} prefix={<SearchOutlined />} />

      <div
        css={css`
          transform: translateY(-5px);
          border: 1px solid ${token.token.colorBorder};
          border-bottom-left-radius: ${token.token.borderRadius}px;
          border-bottom-right-radius: ${token.token.borderRadius}px;
          border-top: none;
          height: 360px;
          margin-bottom: 30px;
          padding-top: 5px;
        `}
      >
        {newFolderMode && (
          <Space
            css={css`
              padding: 6px 10px;
            `}
          >
            <FolderOutlined />
            <Input
              ref={folderNameInputRef}
              placeholder={t('folder.name')}
              size={'small'}
              css={css`
                width: 420px;
              `}
            />
            <Button
              size={'small'}
              onClick={() => {
                setLoding(true);
                setNewFolderMode(false);
                onCreateFolder(
                  folderNameInputRef?.current?.input?.value || '',
                  selectedKey || '',
                ).then((folderID) => {
                  setSelectedKey(folderID);
                  setLoding(false);
                });
              }}
            >
              Create
            </Button>
            <Button size={'small'}>Cancel</Button>
          </Space>
        )}
        {selectedTreeData.map((item, index) => {
          return (
            <div
              onClick={() => {
                if (!item.request) {
                  setSelectedKey(item.key);
                }
              }}
              key={index}
              css={css`
                padding: 0 10px;
                height: 40px;
                line-height: 40px;
                display: flex;
                justify-content: space-between;
                opacity: ${item.request ? 0.4 : 'unset'};
                cursor: ${item.request ? 'default' : 'pointer'};
                .right-arrow {
                  display: none;
                }
                ${!item.request
                ? `&:hover {
                  background-color: #eee;
                  .right-arrow {
                    display: inline;
                  }
                }`
                : null}
              `}
            >
              <Spin spinning={Boolean(item.added)}>
                <RequestItemDisplay
                  itemType={item.request ? ItemType.REQUEST : ItemType.FOLDER}
                  name={item.name}
                  request={item.request}
                />
              </Spin>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default SaveRequestModal;
