import axiosInstance from "./axiosinstance";

const Adminlogin = async (email, password) => {
  const requestdata = {
    email: email,
    password: password,
  };
  try {
    const response = await axiosInstance.post("/admin/adminlogin", requestdata);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    //console.log(error);
    return { error: error.response?.data.error || "Unexpected error occured." };
  }
};
export default Adminlogin;
