import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import isEmpty from 'lodash/isEmpty';
import { stringify } from 'query-string';

import { getCookie } from 'services/utils/cookies'

export function isAxiosError<T>(error: Error | AxiosError<T>): error is AxiosError<T> {
  return (error as AxiosError<T>).isAxiosError !== undefined;
}

export interface ApiResponseError {
  _error: number;
  _errorMessage: string;
  _errorDetails?: unknown;
}

export interface ApiError extends Error {
  error?: number;
  details?: unknown;
}

export interface RestListRequest {
  offset: number;
  limit: number;
}

export type Response = ApiError;

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_GATEWAY
});

axiosClient.interceptors.request.use(
  (config) => {
    const privateToken = getCookie("privateToken")

    let headers: { [key: string]: string } = {
    }

    if (privateToken) {
      headers = {
        ...headers,
        "Authorization": `Bearer ${privateToken}`
      };
    }

    config.headers = headers

    return config
  },
  (error) => Promise.reject(error)
)

export const getRequest = async <T, P>(url: string, params?: P): Promise<T> => {
  let requestUrl = url;
  let options = {};

  if (!isEmpty(params)) {
    requestUrl = `${requestUrl}?${stringify(params as P)}`;
  }

  const result = await axiosClient.get<T>(requestUrl, options);

  return result.data;
};

export const postRequest = async <T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  const result = await axiosClient.post<T>(url, data, config);

  return result.data;
};

export const putRequest = async <T, D>(url: string, data: D): Promise<T> => {
  const result = await axiosClient.put<T>(url, data);

  return result.data;
};

export const deleteRequest = async <T>(url: string): Promise<T> => {
  const result = await axiosClient.delete<T>(url);

  return result.data;
};

export const postRequestWithoutAuth = async <T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  const result = await axios.post<T>(url, data, config);

  return result.data;
};
