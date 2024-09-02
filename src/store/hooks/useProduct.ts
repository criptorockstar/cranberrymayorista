import { useState, useCallback } from "react";
import { createPublicAxiosInstance } from "./axiosConfig";
import { useAppDispatch } from "@/store";
import {
  setProductsState,
  setColorsState,
  setSizesState,
} from "@/store/slices";

const axios = createPublicAxiosInstance();

const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  // Fetch de productos
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/products");
      // Despachar los productos al estado global de Redux
      dispatch(setProductsState(response.data));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Fetch de colores
  const fetchColors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/products/colors");
      // Despachar los colores al estado global de Redux
      dispatch(setColorsState(response.data));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Fetch de tallas
  const fetchSizes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/products/sizes");
      // Despachar las tallas al estado global de Redux
      dispatch(setSizesState(response.data));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return { loading, error, fetchProducts, fetchColors, fetchSizes };
};

export default useProduct;
