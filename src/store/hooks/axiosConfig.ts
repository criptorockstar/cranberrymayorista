import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Instancia para solicitudes autenticadas
const createProtectedAxiosInstance = () => {
  const instance = axios.create({
    baseURL: API_URL,
  });

  // Checks cookies for the access token
  instance.interceptors.request.use(
    (config) => {
      if (typeof window !== "undefined") {
        const access_token = Cookies.get("access_token");

        if (access_token) {
          config.headers["Authorization"] = `Bearer ${access_token}`;
        }
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Check if the request is already retried to avoid infinite loop
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (typeof window !== "undefined") {
          const refresh_token = Cookies.get("refresh_token");

          if (refresh_token) {
            try {
              // Attempt to refresh the token
              const response = await axios.get(`${API_URL}/users/refresh`, {
                headers: { Authorization: `Bearer ${refresh_token}` },
              });
              const { access_token } = response.data;

              // Store the new access token in cookies
              Cookies.set("access_token", access_token, { expires: 7 });
              instance.defaults.headers["Authorization"] =
                `Bearer ${access_token}`;

              // Update original request with new token and retry
              originalRequest.headers["Authorization"] =
                `Bearer ${access_token}`;
              return instance(originalRequest);
            } catch (refreshError) {
              // Remove tokens from cookies if refresh fails
              Cookies.remove("access_token");
              Cookies.remove("refresh_token");

              // Redirect to login
              if (typeof window !== "undefined") {
                window.location.href = "/iniciar-sesion";
              }
            }
          } else {
            // No refresh token available, redirect to login
            Cookies.remove("access_token");
            if (typeof window !== "undefined") {
              window.location.href = "/iniciar-sesion";
            }
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

// Instancia para solicitudes públicas (sin autenticación)
const createPublicAxiosInstance = () => {
  return axios.create({
    baseURL: API_URL,
  });
};

export { createProtectedAxiosInstance, createPublicAxiosInstance };
