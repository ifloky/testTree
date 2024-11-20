import { useEffect, useState } from "react";
import { fetchTreeData } from "../API/api";
import './main-page.css';

export interface TreeNode {
  id: number;
  name: string;
  children: TreeNode[] | null;
}

export const MainPage = () => {
  const [node, setTree] = useState<TreeNode | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [openNodes, setOpenNodes] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const loadTree = async () => {
      setLoading(true);
      try {
        const treeData = await fetchTreeData();
        if (treeData) {
          setTree(treeData);
        } else {
          setError("Не удалось загрузить данные");
        }
      } catch (err) {
        setError("Произошла ошибка при загрузке данных: " + err);
      } finally {
        setLoading(false);
      }
    };

    loadTree();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  const toggleNode = (id: number) => {
    setOpenNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderTree = (node: TreeNode | null, isFirstNode: boolean = false): JSX.Element | null => {
    if (!node) return null;

    const isOpen = openNodes[node.id] || false;
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;

    return (
      <div className="tree-nodes" key={node.id}>
        <div className="tree-nodes__header">
          {hasChildren ? (
            <div
              className="tree-nodes__toggle"
              onClick={() => toggleNode(node.id)}
            >
              {isOpen ? "▼" : "▶"}
            </div>
          ) : (<div className="tree-nodes__toggle"></div>)}
          <div className="tree-nodes__parent-node">{node.name}</div>
          <div className="tree-nodes__btns">
            <div className="tree-nodes-create">+</div>
            {!isFirstNode && <div className="tree-nodes-delete">-</div>}
            {!isFirstNode && <div className="tree-nodes-update">/</div>}
          </div>
        </div>
        {isOpen && hasChildren && (
          <div className="child-node">
            {node.children?.map((child) =>
              renderTree(child, false)
            )}
          </div>
        )}
      </div>
    );
  };

  return <div>{renderTree(node, true)}</div>;
};
