import axiosInstance from "./axiosinstance";

const UpdateTimelines = async (token, requestdata) => {
  try {
    //console.log(requestdata, "req");
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post(
      "/admin/updatetimeline",
      requestdata,
      { headers }
    );
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};
export default UpdateTimelines;
