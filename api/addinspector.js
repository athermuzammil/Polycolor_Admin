import axiosInstance from "./axiosinstance";

const Addinspector = async (token, requestdata) => {
  //console.log(token);
  const headers = {
    authorization: `Bearer ${token}`,
  };

  try {
    const response = await axiosInstance.post(
      "/admin/addinspector",
      requestdata,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};
export default Addinspector;
