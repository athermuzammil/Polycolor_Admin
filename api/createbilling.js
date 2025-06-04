import axiosInstance from "./axiosinstance";

const createBilling = async (token, requestdata) => {
  try {
    //console.log(requestdata, "req");
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post(
      "/admin/createbilling",
      requestdata,
      { headers }
    );
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};
export default createBilling;
