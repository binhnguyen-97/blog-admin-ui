import { createContext } from "react";

import { IUserInfo } from 'interfaces';

interface IAuthCxt {
  authenticated: boolean,
  userInfo: IUserInfo,
  loaded: boolean,
}

export const DEFAULT_AUTH_VALUE: IAuthCxt = {
  authenticated: false,
  userInfo: {
    id: '',
    email: '',
    name: '',
    avatar: '',
    role: ''
  },
  loaded: false,
};

const AuthContext = createContext(DEFAULT_AUTH_VALUE);

AuthContext.displayName = "AuthContext";

export default AuthContext;
