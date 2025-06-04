import axiosInstance from "./axiosinstance";

const getBillingsOfOrder = async (token, id) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get(
      `/admin/getbillingsoforder/${id}`,
      {
        headers,
      }
    );
    //console.log(response, "rrr");
    return response.data;
  } catch (error) {
    //console.log(error);

    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};
export default getBillingsOfOrder;
