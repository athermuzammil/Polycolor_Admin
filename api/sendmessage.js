import instance from "./axiosinstance";
const sendMessage = async (token, content, chatID, file) => {
  //console.log(token, content, "inspect");
  try {
    const headers = {
      authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    const formdata = new FormData();
    if (file) {
      formdata.append("chat", file);
    }
    const response = await instance.post(
      `/admin/sendmessage?message=${content ? content : " "}&chatId=${chatID}`,
      formdata,
      {
        headers,
      }
    );
    //console.log("Message REsponse", response.data); // Corrected console.log usage]
    return response.data; // Adjust according to your API response structure
  } catch (error) {
    console.error("Error fetching chats", error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};
export default sendMessage;
