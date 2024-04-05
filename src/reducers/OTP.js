const OTPReducer = (
  state = {
    userVerified: false,
  },
  action
) => {
  switch (action.type) {
    case "VERIFY_OTP":
      return {
        userVerified: action.payload,
      };
    case "VERIFY_OTP_FAILURE":
      console.log("failed");
      return state;
    default:
      return state;
  }
};

export default OTPReducer;
