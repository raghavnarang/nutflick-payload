export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const parseJWT = (token: string) =>
  JSON.parse(atob(token.split(".")[1]));

export const isJWTExpired = (token: string) =>
  Math.floor(new Date().getTime() / 1000) >= parseJWT(token).exp;
