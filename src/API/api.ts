export interface createData {
  parentNodeId: number;
  nodeName: string;
}

export interface renameData {
  nodeId: number;
  newNodeName: string;
}

const API_URL = "https://test.vmarmysh.com/";


export const fetchTreeData = async () => {
  try {
    const response = await fetch(API_URL + 'api.user.tree.get?treeName=%7BC9232B85-AD10-459C-A44F-70CA30C60E5F%7D', {
      method: 'POST',
      headers: {
        'accept': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();    
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return null;
  }
};

export const createNode = async (data: createData): Promise<void | null> => {
  try {
    const response: Response = await fetch(API_URL + 
      'api.user.tree.node.create?treeName=%7BC9232B85-AD10-459C-A44F-70CA30C60E5F%7D' + 
      `&parentNodeId=${data.parentNodeId}` + 
      `&nodeName=${data.nodeName}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return null;
  }
};

export const deleteNode = async (nodeId: number): Promise<void | null> => {
  try {
    const response: Response = await fetch(API_URL + 
      'api.user.tree.node.delete?treeName=%7BC9232B85-AD10-459C-A44F-70CA30C60E5F%7D' +
      `&nodeId=${nodeId}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return null;
  }
};

export const renameNode = async (data: renameData): Promise<void | null> => {
  try {
    const response: Response = await fetch(API_URL + 
      'api.user.tree.node.rename?treeName=%7BC9232B85-AD10-459C-A44F-70CA30C60E5F%7D' +
      `&nodeId=${data.nodeId}` + 
      `&newNodeName=${data.newNodeName}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return null;
  }
};