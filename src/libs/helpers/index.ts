import { ItemType, TreeNode } from '@/remocollab/prc-base/token.ts';

export function findNodeByKey(tree: TreeNode[], nameToFind: string): TreeNode | null {
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

export function findPathByKey(
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

export   function searchNodes(treeData, searchValue,allowTypes) {
  const results = [];

  function search(node, path) {
    const currentPath = path ? `${path} > ${node.name}` : node.name;

    if (node.name.includes(searchValue) && allowTypes.includes(node.type)) {
      results.push({
        type:node.type,
        node: node,
        name: node.name,
        key: node.key,
        path: currentPath,
      });
    }

    if (node.item) {
      node.item.forEach((childNode) => {
        search(childNode, currentPath);
      });
    }
  }

  treeData.forEach((node) => {
    search(node, '');
  });

  return results;
}

// const searchedTreeData1 = [
//   {
//     name: 'test',
//     key: 'test',
//     test: (
//       <div>
//         {'canyon'}&nbsp;/&nbsp;{'test'}&nbsp;/&nbsp;
//         <span
//           css={css`
//             color: rebeccapurple;
//           `}
//         >
//           {'sss'}
//         </span>
//       </div>
//     ),
//   },
// ];
