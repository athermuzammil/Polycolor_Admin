import axiosInstance from "./axiosinstance";

const AddQuoteFile = async (
  token,
  qid,
  file,
  discountAdded,
  discountedTotal
) => {
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
      `/admin/addquotefile?quoteId=${qid}&discountAdded=${
        discountAdded || false
      }&discountedTotal=${discountedTotal || 0}`,
      requestData,
      { headers }
    );
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};

export default AddQuoteFile;
