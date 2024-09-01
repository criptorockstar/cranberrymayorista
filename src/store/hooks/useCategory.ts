import { useState, useCallback } from "react";
import { createPublicAxiosInstance } from "./axiosConfig";
import { useAppDispatch } from "@/store";
import { setCategoriesState } from "@/store/slices";

const axios = createPublicAxiosInstance();

const useCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  // Memoiza fetchCategories para evitar que se vuelva a crear en cada renderizado
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/products/categories");
      // Despachar las categorías al estado global de Redux
      dispatch(setCategoriesState(response.data));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]); // Dependencias de useCallback

  return { loading, error, fetchCategories };
};

export default useCategory;
