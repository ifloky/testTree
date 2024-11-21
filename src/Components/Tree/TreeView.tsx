import React, { FC } from "react";
import "./Tree.css";
import { TreeNode as TreeNodeType } from "./tree-types";

interface TreeNodeProps {
  node: TreeNodeType;
  isOpen: boolean;
  isActive: boolean;
  isFirstNode: boolean;
  onToggle: (id: number) => void;
  onSetActive: (id: number | null) => void;
  onAdd: (parentId: number) => void;
  onEdit: (nodeId: number, currentName: string) => void;
  onDelete: (nodeId: number) => void;
  children?: React.ReactNode;
}

export const TreeNode: FC<TreeNodeProps> = ({
  node,
  isOpen,
  isActive,
  isFirstNode,
  onToggle,
  onSetActive,
  onAdd,
  onEdit,
  onDelete,
  children,
}) => {
  return (
    <div className="tree-node">
      <div
        className="tree-node__header"
        onClick={() => onSetActive(isActive ? null : node.id)}
      >
        <div
          className="tree-node__toggle"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(node.id);
          }}
        >
          {node.children?.length ? (isOpen ? "⤵️" : "➡️") : ""}
        </div>
        <div className="tree-node__name">{node.name}</div>
        {isActive && (
          <div className="tree-node__btns">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd(node.id);
              }}
            >
              ➕
            </button>
            {!isFirstNode && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(node.id, node.name);
                  }}
                >
                  ✎
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(node.id);
                  }}
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        )}
      </div>
      {isOpen && children && <div className="tree-node__children">{children}</div>}
    </div>
  );
};
