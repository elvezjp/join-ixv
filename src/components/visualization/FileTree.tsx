import { TreeView, TreeItem } from '@mui/x-tree-view';
import { ExpandMore, ChevronRight } from '@mui/icons-material';
import { FileNode } from '@/lib/analyzer/types';

interface FileTreeProps {
  files: FileNode[];
}

interface TreeNodeData {
  id: string;
  name: string;
  children?: TreeNodeData[];
}

const FileTree = ({ files }: FileTreeProps) => {
  const buildTree = (files: FileNode[]): TreeNodeData[] => {
    const tree: TreeNodeData[] = [];
    const pathMap = new Map<string, TreeNodeData>();

    files.forEach(file => {
      const parts = file.path.split('/');
      let currentPath = '';

      parts.forEach((part: string, index: number) => {
        const isFile = index === parts.length - 1;
        currentPath = currentPath ? `${currentPath}/${part}` : part;

        if (!pathMap.has(currentPath)) {
          const node: TreeNodeData = {
            id: currentPath,
            name: part,
            children: isFile ? undefined : []
          };
          pathMap.set(currentPath, node);

          if (index === 0) {
            tree.push(node);
          } else {
            const parentPath = parts.slice(0, index).join('/');
            const parent = pathMap.get(parentPath);
            parent?.children?.push(node);
          }
        }
      });
    });

    return tree;
  };

  const renderTree = (nodes: TreeNodeData[]) => {
    return nodes.map((node) => (
      <TreeItem key={node.id} nodeId={node.id} label={node.name}>
        {node.children && renderTree(node.children)}
      </TreeItem>
    ));
  };

  const treeData = buildTree(files);

  const defaultExpanded = ['src'];

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      defaultExpanded={defaultExpanded}
      sx={{
        height: '100%',
        overflowY: 'auto',
        width: '300px',
        padding: 2,
        borderColor: 'divider',
        color: 'black',
        '& .MuiTreeItem-label': {
          color: 'black',
        },
        '& .MuiTreeItem-root': {
          color: 'black',
        }
      }}
    >
      {renderTree(treeData)}
    </TreeView>
  );
};

export default FileTree;