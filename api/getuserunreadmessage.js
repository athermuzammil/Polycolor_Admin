import axiosInstance from "./axiosinstance";
const Getuserunreadmessage = async (token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get("/user/getuserunreadmessage", {
      headers,
    });
    //console.log(response, "rrr");
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};
export default Getuserunreadmessage;
