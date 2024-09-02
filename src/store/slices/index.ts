import {
  setUserState,
  setEmailState,
  setUsernameState,
  clearUserState,
  userReducer,
} from "./userSlice";

import {
  categoryReducer,
  setCategoriesState,
  addCategory,
  removeCategory,
  clearCategoriesState,
} from "./categorySlice";

import {
  productReducer,
  setProductsState,
  addProduct,
  removeProduct,
  clearProductsState,
  setColorsState,
  setSizesState,
  selectProductImages,
  selectProductColors,
  selectProductSizes,
  selectGlobalColors,
  selectGlobalSizes,
} from "./productSlice";

export {
  userReducer,
  setUserState,
  setEmailState,
  setUsernameState,
  clearUserState,
  categoryReducer,
  setCategoriesState,
  addCategory,
  removeCategory,
  clearCategoriesState,
  productReducer,
  setProductsState,
  addProduct,
  removeProduct,
  clearProductsState,
  setColorsState,
  setSizesState,
  selectProductImages,
  selectProductColors,
  selectProductSizes,
  selectGlobalColors,
  selectGlobalSizes,
};
