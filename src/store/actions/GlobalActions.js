export const LOADING_ON = "LOADING_ON";
export const LOADING_OFF = "LOADING_OFF";
export const RESET_ERROR_MESSAGE = "RESET_ERROR_MESSAGE";

export function turnOnLoading() {
  return {
    type: LOADING_ON,
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