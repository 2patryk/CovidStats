export const LOADING_ON = "LOADING_ON";
export const LOADING_OFF = "LOADING_OFF";
export const SET_IS_MOBILE = "SET_IS_MOBILE";
export const RESET_ERROR_MESSAGE = "RESET_ERROR_MESSAGE";

export function setIsMobile(payload) {
  return {
    type: SET_IS_MOBILE,
    payload
  };
}

export function turnOffLoading() {
  return {
    type: LOADING_OFF,
  };
}

export function resetErrors() {
    return {
      type: RESET_ERROR_MESSAGE,
    };
  }