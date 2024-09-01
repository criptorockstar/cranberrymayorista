import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProductState {
  id?: number;
  image?: string;
  name?: string;
  slug?: string;
  description: string;
  stock: number;
  price: number;
  discount: number;
  featured: boolean;
}

export interface ProductState {
  products: IProductState[];
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsState: (state, action: PayloadAction<IProductState[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<IProductState>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (category) => category.id !== action.payload,
      );
    },
    clearProductsState: (state) => {
      state.products = [];
    },
  },
});

export const {
  setProductsState,
  addProduct,
  removeProduct,
  clearProductsState,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
