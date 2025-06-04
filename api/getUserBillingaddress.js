import axiosInstance from "./axiosinstance";
const getuserbillingaddress = async (token, id) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get(
      `/admin/getuserbillingaddress/${id}`,
      {
        headers,
      }
    );
    //console.log(response, "rrr");
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error Occured" };
  }
};
export default getuserbillingaddress;
