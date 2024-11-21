import React, { useState } from "react";
import "./popup.css";

interface PopupProps {
  mode: "add" | "edit";
  parentId?: number;
  nodeId?: number;
  currentName?: string;
  onClose: () => void;
  onAdd: (parentId: number, nodeName: string) => void;
  onEdit: (nodeId: number, newName: string) => void;
}

export const Popup: React.FC<PopupProps> = ({
  mode,
  parentId,
  nodeId,
  currentName = "",
  onClose,
  onAdd,
  onEdit,
}) => {
  const [name, setName] = useState<string>(currentName);

  const handleSubmit = () => {
    if (mode === "add" && parentId) onAdd(parentId, name);
    if (mode === "edit" && nodeId) onEdit(nodeId, name);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup__content">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя узла"
        />
        <button onClick={handleSubmit}>{mode === "add" ? "Добавить" : "Сохранить"}</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
};
