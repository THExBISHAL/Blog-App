import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "@/constants/config";
import { getAccessToken, getType } from "@/utils/common-util";

const API_URL = "https://blog-app-backend-8ic8.onrender.com";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // i can stop loader here if needed
    return processResponse(response);
  },
  (error) => {
    // i can stop loader here if needed
    return Promise.reject(processError(error));
  }
);

/////////////////////////////
const processResponse = (response) => {
  if (response?.status === 200 || response?.status === 201) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      message: response?.data?.message,
      code: response?.data?.code,
    };
  }
};

const processError = (error) => {
  if (error?.response) {
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.responseFailure.message,
      code: error?.response?.status,
    };
  } else if (error.request) {
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.requestFailure.message,
      code: "",
    };
  } else {
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.networkError.message,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) => {
    const isFormData = body instanceof FormData;
    const header = {
      authorization: getAccessToken(),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    };

    return axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? {} : body,
      responseType: value.responseType,
      headers: header,
      TYPE: getType(value, body),
      onUploadProgress: (progressEvent) => {
        if (showUploadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: (progressEvent) => {
        if (showDownloadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    });
  };
}

export { API };
