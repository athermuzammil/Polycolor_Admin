import axiosInstance from "./axiosinstance";

const Updatequote = async (token, requestdata) => {
  try {
    //console.log(requestdata, "req");
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post(
      "/admin/updatequote",
      requestdata,
      { headers }
    );
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};
export default Updatequote;
