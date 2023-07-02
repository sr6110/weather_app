export const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error("Error fetching data:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };