import axiosInstance from "./axiosinstance";

const getAllRequestedQuotes = async (token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get("/admin/getallrequestedquotes", {
      headers,
    });
    //console.log(response, "ooo");
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};
export default getAllRequestedQuotes;
