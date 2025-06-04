import axiosInstance from "./axiosinstance";

const addDispatchFile = async (token, id, file) => {
  //console.log(token);
  const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data", // Needed for file uploads
  };

  const requestData = new FormData();
  //console.log(file, "ffff");
  if (file) {
    requestData.append("quotes", file);
  }

  try {
    const response = await axiosInstance.post(
      `/admin/addDispatchFile?orderId=${id}`,
      requestData,
      { headers }
    );
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};

export default addDispatchFile;
