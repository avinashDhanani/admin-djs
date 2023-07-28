const BASE_URL = "http://localhost:3005";

// admin api's

export const ADMIN_LOGIN = `${BASE_URL}/api/admin/login-admin`;
export const USER_COUNT_URL = `${BASE_URL}/api/user/count-total-users`;
export const GET_BOOKING_COUNT = `${BASE_URL}/api/booking/total-booking-count`;
export const UPDATE_ADMIN_PASS = `${BASE_URL}/api/admin/update-password`;
export const GET_ALL_DJS = `${BASE_URL}/api/user/get-all-admin-dj`;
export const GET_ALL_USERS = `${BASE_URL}/api/user/get-all-admin-user`;
export const GET_ALL_BOOKINGS = `${BASE_URL}/api/booking/get-all-booking`;
export const GET_USER_BOOKINGS = `${BASE_URL}/api/booking/get-admin-user-booking/`;
export const GET_USER_DETAILS = `${BASE_URL}/api/user/get-admin-user-detail/`;
export const GET_DJ_DETAILS = `${BASE_URL}/api/user/get-admin-dj-detail/`;
export const GET_DJ_RATINGS = `${BASE_URL}/api/booking/get-admin-dj-rating/`;
export const GET_DJ_CALANDER = `${BASE_URL}/api/booking/get-admin-dj-calendar/`;
export const SEARCH_USER_DJ = `${BASE_URL}/api/user/search-user-dj`;
export const SEARCH_BOOKING = `${BASE_URL}/api/booking/admin-booking-search`;
export const UPDATE_BLOCK = `${BASE_URL}/api/user/update-block-status`;
export const GET_DJ_OF_WEEK_LIST = `${BASE_URL}/api/djOfWeek/dj-of-week`;
export const UPDATE_DJ_OF_THE_WEEK = `${BASE_URL}/api/djOfWeek/update-dj-of-week`;
export const REJECT_DJ_OF_THE_WEEK = `${BASE_URL}/api/djOfWeek/dj-of-week`;
export const APPROVE_DJ_OF_THE_WEEK = `${BASE_URL}/api/djOfWeek/dj-of-week`;

