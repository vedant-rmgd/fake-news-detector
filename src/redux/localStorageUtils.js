export const saveToStorage = (data) => {
  localStorage.setItem("truthcheck-history", JSON.stringify(data));
};

export const loadFromStorage = () => {
  try {
    const data = localStorage.getItem("truthcheck-history");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};
