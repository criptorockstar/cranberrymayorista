import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces para colores y talles
export interface IColor {
  id: number;
  name: string;
}

export interface ISize {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  image?: string;
  name?: string;
  slug?: string;
  description: string;
  stock: number;
  price: number;
  discount: number;
  featured: boolean;
}

// Estado global que incluye productos, colores, talles y relaciones
export interface ProductState {
  products: IProduct[];
  colors: IColor[];
  sizes: ISize[];
  productColors: { [productId: number]: IColor[] }; // Colores por producto
  productSizes: { [productId: number]: ISize[] }; // Talles por producto
}

// Estado inicial
const initialState: ProductState = {
  products: [],
  colors: [],
  sizes: [],
  productColors: {},
  productSizes: {},
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
    // Establecer el estado de colores
    setColorsState: (state, action: PayloadAction<IColor[]>) => {
      state.colors = action.payload;
    },
    // Establecer el estado de talles
    setSizesState: (state, action: PayloadAction<ISize[]>) => {
      state.sizes = action.payload;
    },
    // Establecer colores para un producto
    setProductColors: (
      state,
      action: PayloadAction<{ productId: number; colors: IColor[] }>,
    ) => {
      state.productColors[action.payload.productId] = action.payload.colors;
    },
    // Establecer talles para un producto
    setProductSizes: (
      state,
      action: PayloadAction<{ productId: number; sizes: ISize[] }>,
    ) => {
      state.productSizes[action.payload.productId] = action.payload.sizes;
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
  setProductColors,
  setProductSizes,
} = productSlice.actions;

// Exportar el reducer
export const productReducer = productSlice.reducer;

// Selectores
import { RootState } from "@/store";

// Selector para obtener los colores de un producto
export const selectProductColors = (state: RootState, productId: number) => {
  return state.product.productColors[productId] || [];
};

// Selector para obtener los talles de un producto
export const selectProductSizes = (state: RootState, productId: number) => {
  return state.product.productSizes[productId] || [];
};
