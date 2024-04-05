import * as api from "../api";

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = (id, updateData) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(id, updateData);
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const OTPVerificationEmail = (OTPData) => async (dispatch) => {
  try {
    const { data } = await api.sentOTPVerificationEmail(OTPData);
    dispatch({ type: "OTP_VERIFICATION_EMAIL", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const verifyOTP = (OTP) => async (dispatch) => {
  try {
    const { data } = await api.verifyOTP(OTP);
    dispatch({ type: "VERIFY_OTP", payload: data?.userVerified });
  } catch (error) {
    dispatch({ type: "VERIFY_OTP_FAILURE" });
    console.log(error);
  }
};
