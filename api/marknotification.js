import axiosInstance from "./axiosinstance";

const MarkNotification = async (token, id) => {
  try {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const requestdata = { notificationId: id };
    const response = await axiosInstance.post(
      "/admin/marknotification",
      requestdata,
      { headers }
    );
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};
export default MarkNotification;
