/**
 * todo props and refactor
 * @param name
 * @param value
 */
export const setCookie = (name, value) => {
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
};

export const getCookie = (name) => {
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return null;
};
