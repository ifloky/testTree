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
