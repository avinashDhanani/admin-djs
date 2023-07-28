import axios from "axios";
import { ADMIN_LOGIN,  } from "../constant/constants";

const getAdmin = async (currentUser) => {
  const response = await axios.get(ADMIN_LOGIN, {
    headers: {
      Authorization: `Bearer ${currentUser.data.token}`,
    },
  });
  return response.data;
};

const upateProfile = async (userProfile, accessToken) => {
  const response = await axios.post('PROFIE_UPDATE_URL', userProfile, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const updatePass = async (userPass, accessToken) => {
  const response = await axios.post('UPDATE_PASSWORD', userPass, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const getDjUsersList = async (accessToken) => {
  const response = await axios.get('DJ_LIST_URL', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};


const userServices = { getAdmin, upateProfile, updatePass};

export default userServices;
