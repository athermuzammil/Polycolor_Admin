import axiosInstance from "./axiosinstance";

const getallcustomernquotes = async (token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get(
      "/admin/getAllUsersWithRequestedQuote",
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
export default getallcustomernquotes;
