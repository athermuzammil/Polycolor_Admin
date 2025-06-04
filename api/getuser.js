import axiosInstance from "./axiosinstance";
const getuser = async (token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get("/admin/getadmin", {
      headers,
    });
    //console.log(response, "rrr");
    return response.data;
  } catch (error) {
    //console.log(error);
    localStorage.removeItem("token");
    window.location.href = "/";
    return { error: error.response?.data.error || "Unexpected error Occured" };
  }
};
export default getuser;
