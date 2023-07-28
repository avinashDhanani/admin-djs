import axios from "axios";
import { ADMIN_LOGIN } from "../constant/constants";

const loginAdmin = async (userCredentials) => {
  const response = await axios.post(ADMIN_LOGIN, userCredentials);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = { loginAdmin };

export default authService;
