export function isValidEmail(email) {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(email);
}

const LOWER_REGEX = /([a-z])/g;
const UPPER_REGEX = /([A-Z])/g;
const NUM_REGEX = /([\d])/g;
const SPECIAL_REGEX = /([$&+,:;=?@#|'<>.^*()%!-])/g;

export function isValid(
  password,
  minLength = 5,
  maxLength = 20,
  lowerMinCount = 3,
  upperMinCount = 1,
  numMinCount = 1,
  specialMinCount = 1
) {
  let upperMatch = password.match(UPPER_REGEX) ?? [];
  let lowerMatch = password.match(LOWER_REGEX) ?? [];
  let numMatch = password.match(NUM_REGEX) ?? [];
  let specialMatch = password.match(SPECIAL_REGEX) ?? [];
  return (
    password.length >= minLength &&
    upperMatch.length >= upperMinCount &&
    lowerMatch.length >= lowerMinCount &&
    numMatch.length >= numMinCount &&
    specialMatch.length >= specialMinCount &&
    password.length <= maxLength
  );
}

export function isEqual(password, confirmPassword) {
  return password === confirmPassword;
}
