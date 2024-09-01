import { useState, useCallback } from "react";
import { createPublicAxiosInstance } from "./axiosConfig";
import { useAppDispatch } from "@/store";
import { setProductsState } from "@/store/slices";

const axios = createPublicAxiosInstance();

const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  // Memoiza fetchCategories para evitar que se vuelva a crear en cada renderizado
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/products");
      // Despachar las categorías al estado global de Redux
      dispatch(setProductsState(response.data));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]); // Dependencias de useCallback

  const fetchFeaturedProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/products/featured");
      // Despachar las categorías al estado global de Redux
      dispatch(setProductsState(response.data));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]); // Dependencias de useCallback

  return { loading, error, fetchProducts, fetchFeaturedProducts };
};

export default useProduct;
