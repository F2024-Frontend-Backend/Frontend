// Fetch Items from file
const getItems = async (filePath: RequestInfo, fileType: String) => {
  try {
    const response = await fetch(filePath);
    switch (fileType.toUpperCase()) {
      case "JSON":
        return response.json();
      default:
        return response;
    }
  } catch (error) {
    return error;
  }
};
