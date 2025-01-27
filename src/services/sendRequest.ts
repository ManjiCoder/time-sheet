import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
const baseURL = 'https://sheetdb.io/api/v1/yy3v79okf45e3';
const timeout = 5000;

interface Request {
  endPoint: string;
  method: Method;
  header?: Record<string, string>;
  data?: unknown;
  params?: Record<string, unknown>;
}

const defaltConfig: AxiosRequestConfig = {
  baseURL,
  timeout,
  headers: { 'Content-Type': 'application/json' },
};
const axiosInstance: AxiosInstance = axios.create(defaltConfig);

const sendRequest = async <T>({
  method,
  endPoint,
  headers,
  data,
  params,
}: Request) => {
  try {
    const config: AxiosRequestConfig = { ...defaltConfig };
    if (data) {
      config.data = data;
    }
    if (headers) {
      config.headers = headers;
    }
    if (params) {
      config.params = params;
    }
    const res = await axiosInstance(config);
    console.log(res.data);
    return (await res.data) as T;
  } catch (error) {
    console.log(error);
  }
};

export default sendRequest;
