import React, { useState } from "react";
import "./Tree.css";
import { TreeNode } from "./TreeView";
import { TreeNode as TreeNodeType } from "./tree-types";

interface TreeProps {
  tree: TreeNodeType | null;
  onAdd: (parentId: number, nodeName: string) => void;
  onEdit: (nodeId: number, newName: string) => void;
  onDelete: (nodeId: number) => void;
}

export const Tree: React.FC<TreeProps> = ({ tree, onAdd, onEdit, onDelete }) => {
  const [openNodes, setOpenNodes] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  const toggleNode = (id: number) => {
    setOpenNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTree = (node: TreeNodeType | null, isFirstNode = false, level = 0): JSX.Element | null => {
    if (!node) return null;

    return (
      <TreeNode
        key={node.id}
        node={node}
        isOpen={!!openNodes[node.id]}
        isActive={activeNodeId === node.id}
        isFirstNode={isFirstNode}
        level={level} 
        onToggle={toggleNode}
        onSetActive={setActiveNodeId}
        onAdd={(parentId) => onAdd(parentId, "")}
        onEdit={onEdit}
        onDelete={onDelete}
      >
        {node.children?.map((child) => renderTree(child, false, level + 1))}
      </TreeNode>
    );
  };

  return <div className="tree">{renderTree(tree, true)}</div>;
};
