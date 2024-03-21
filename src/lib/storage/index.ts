export const saveData = async (key: string, value: any): Promise<any> => {
  try {
    const jsonValue = JSON.stringify(value);
    await localStorage.setItem(key, jsonValue);
    return value;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const getData = async (key: string): Promise<any> => {
  try {
    const jsonValue = await localStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const storage = {
  saveData,
  getData,
};

export default storage;
