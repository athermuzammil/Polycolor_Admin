import axiosInstance from "./axiosinstance";

const SendQuoteToUser = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post(
      `/admin/sendquotetouser/${id}`,
      {},
      { headers }
    );
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};
export default SendQuoteToUser;
