import axios from "axios";

export const fetchProducts = async () => {
  // Fetch Items from Backend
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/products/");
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
