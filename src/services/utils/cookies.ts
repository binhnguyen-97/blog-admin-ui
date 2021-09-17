import Cookies, { CookieAttributes } from "js-cookie";

const cookieConfig: CookieAttributes = {
  domain: process.env.NODE_ENV !== 'production' ? 'localhost' : '',
}

export const setCookie = (key: string, value: string, expires?: number | Date) => {
  Cookies.set(key, value, {
    ...cookieConfig,
    expires
  })
}

export const getCookie = (key: string) => {
  return Cookies.get(key)
}

export const deleteCookie = (key: string) => {
  Cookies.remove(key, cookieConfig)
}
