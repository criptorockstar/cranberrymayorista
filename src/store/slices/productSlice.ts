import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces para colores, tallas e imágenes
export interface IColor {
  id: number;
  name: string;
}

export interface ISize {
  id: number;
  name: string;
}

export interface IImage {
  id: number;
  url: string;
}

export interface IProduct {
  id: number;
  images: IImage[]; // Lista de imágenes del producto
  name?: string;
  slug?: string;
  description: string;
  stock: number;
  price: number;
  discount: number;
  featured: boolean;
  colors: IColor[];
  sizes: ISize[];
}

// Estado global que incluye productos, colores y tallas independientes
export interface ProductState {
  products: IProduct[];
  colors: IColor[];
  sizes: ISize[];
}

// Estado inicial
const initialState: ProductState = {
  products: [],
  colors: [],
  sizes: [],
};

// Slice de Redux
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Establecer el estado de productos
    setProductsState: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    // Agregar un producto
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
    // Eliminar un producto por ID
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },
    // Limpiar el estado de productos
    clearProductsState: (state) => {
      state.products = [];
    },
    // Establecer el estado de colores globales
    setColorsState: (state, action: PayloadAction<IColor[]>) => {
      state.colors = action.payload;
    },
    // Establecer el estado de tallas globales
    setSizesState: (state, action: PayloadAction<ISize[]>) => {
      state.sizes = action.payload;
    },
  },
});

// Exportar las acciones
export const {
  setProductsState,
  addProduct,
  removeProduct,
  clearProductsState,
  setColorsState,
  setSizesState,
} = productSlice.actions;

// Exportar el reducer
export const productReducer = productSlice.reducer;

// Selectores
import { RootState } from "@/store";

// Selector para obtener las imágenes de un producto
export const selectProductImages = (
  state: RootState,
  productId: number,
): IImage[] => {
  const product = state.product.products.find(
    (product) => product.id === productId,
  );
  return product?.images || [];
};

// Selector para obtener los colores de un producto
export const selectProductColors = (
  state: RootState,
  productId: number,
): IColor[] => {
  const product = state.product.products.find(
    (product) => product.id === productId,
  );
  return product?.colors || [];
};

// Selector para obtener las tallas de un producto
export const selectProductSizes = (
  state: RootState,
  productId: number,
): ISize[] => {
  const product = state.product.products.find(
    (product) => product.id === productId,
  );
  return product?.sizes || [];
};

// Selector para obtener los colores globales no asociados a un producto
export const selectGlobalColors = (state: RootState): IColor[] =>
  state.product.colors;

// Selector para obtener las tallas globales no asociadas a un producto
export const selectGlobalSizes = (state: RootState): ISize[] =>
  state.product.sizes;
