"use client";

import { useState } from "react";
import { createPublicAxiosInstance } from "./axiosConfig";
import { useAppDispatch } from "@/store";
import { setUserState } from "@/store/slices";

const axios = createPublicAxiosInstance();

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/users/sign-in", { email, password });
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      const userState = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
      };

      dispatch(setUserState(userState));

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      axios.defaults.headers["Authorization"] = `Bearer ${access_token}`;

      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    password_confirmation: string,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/users/sign-up", {
        email,
        password,
        password_confirmation,
      });
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      const userState = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
      };

      dispatch(setUserState(userState));

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      axios.defaults.headers["Authorization"] = `Bearer ${access_token}`;

      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/users/authenticated");
      return response.data.authenticated;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const passwordRecovery = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/users/password-recovery", { email });
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const passwordReset = async (
    password: string,
    password_confirmation: string,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put("/users/password-reset", {
        password,
        password_confirmation,
      });
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signIn, signUp, passwordRecovery, isAuthenticated, loading, error };
};

export default useAuth;
