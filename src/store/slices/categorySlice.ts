import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICategoryState {
  id?: number;
  image?: string;
  name?: string;
  slug?: string;
}

export interface CategoriesState {
  categories: ICategoryState[];
}

const initialState: CategoriesState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoriesState: (state, action: PayloadAction<ICategoryState[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<ICategoryState>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload,
      );
    },
    clearCategoriesState: (state) => {
      state.categories = [];
    },
  },
});

export const {
  setCategoriesState,
  addCategory,
  removeCategory,
  clearCategoriesState,
} = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
