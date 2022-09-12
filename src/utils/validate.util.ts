export const regexEmailFormat =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const regexPwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

export const regexNumber = /^[0-9]*$/;

export const validateEmail = (
  email: string,
  requiredMsg: string,
  errMsg: string,
  regex: RegExp
) => {
  const isValidEmail = regex?.test(email?.toLowerCase());
  if (email?.trim()?.length > 0 && !isValidEmail) {
    return errMsg;
  }
  if (!email?.trim()) {
    return requiredMsg;
  }
  return null;
};

export const validateUser = (userName: string, requiredMsg: string, errMsg: string): string => {
  if (!userName?.trim()) {
    return requiredMsg;
  }
  if (userName?.trim()?.length <= 4) {
    return errMsg;
  }
  return '';
};

export const validatePw = (password: string, requiredMsg: string, errMsg: string): string => {
  if (!password?.trim()) {
    return requiredMsg;
  }
  if (password?.trim()?.length < 8) {
    return errMsg;
  }
  return '';
};

export const validateConfirmPw = (
  password: string,
  confirmPw: string,
  requiredMsg: string,
  errMsg: string
) => {
  if (!confirmPw?.trim()) {
    return requiredMsg;
  }
  if (password !== confirmPw) {
    return errMsg;
  }
  return '';
};
