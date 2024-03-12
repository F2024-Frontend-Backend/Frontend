import React, { useState, useEffect } from "react";
import axios from "axios";

interface product {
  id: number;
  name: string;
}
function FetchDataApi() {
  // Fetch Items from Backend
  const [items, setItems] = useState<product[]>([]);
  useEffect(() => {
    axios
      .get<product[]>("http://127.0.0.1:8000/api/products/")
      .then((respons) => {
        setItems(respons.data);
      })
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  if (!items) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
export default FetchDataApi;
