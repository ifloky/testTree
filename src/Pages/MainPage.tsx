import { useEffect, useState } from "react";
import { Tree } from "../Components/Tree/Tree";
import { Popup } from "../Components/Popup/Popup";
import { fetchTreeData, createNode, renameNode, deleteNode, createData, renameData } from "../Api/api";
import { TreeNode } from "../Components/Tree/tree-types";

export const MainPage = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [popupMode, setPopupMode] = useState<"add" | "edit" | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<number | undefined>();
  const [currentNodeName, setCurrentNodeName] = useState<string>("");

  const updateTree = async () => {
    const data = await fetchTreeData();
    setTree(data);
  };

  useEffect(() => {
    updateTree();
  }, []);


  const handleAddNode = (parentId: number, nodeName: string) => {
    const data: createData = { parentNodeId: parentId, nodeName };
    createNode(data);
    updateTree();
  };

  const handleDeleteNode = (nodeId: number) => {
    deleteNode(nodeId);
    updateTree();
  };

  const handleRenameNode = (nodeId: number, newName: string) => {
    const data: renameData = { nodeId, newNodeName: newName };    
    renameNode(data);
    updateTree();
  };

  const openPopup = (mode: "add" | "edit", nodeId?: number, nodeName?: string) => {
    setPopupMode(mode);
    setCurrentNodeId(nodeId);
    setCurrentNodeName(nodeName || "");
  };

  return (
    <div>
      <Tree
        tree={tree}
        onAdd={(parentId) => openPopup("add", parentId)}
        onEdit={(nodeId, nodeName) => openPopup("edit", nodeId, nodeName)}
        onDelete={handleDeleteNode}
      />
      {popupMode && (
        <Popup
          mode={popupMode}
          parentId={currentNodeId}
          nodeId={currentNodeId}
          currentName={currentNodeName}
          onClose={() => setPopupMode(null)}
          onAdd={handleAddNode}
          onEdit={handleRenameNode}
        />
      )}
    </div>
  );
};
