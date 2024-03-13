import axios from "axios";

export const fetchProducts = async (signal: AbortSignal) => {
  // Fetch Items from Backend
  // get -> a promis -> if goes wrong get an -> rec / err
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/products/", {
      signal: signal,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products", error);
    throw error;
  }
};
