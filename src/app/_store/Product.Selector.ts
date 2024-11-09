import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ProductModel} from "../model/ProductStatemodel";

const getProductState = createFeatureSelector<ProductModel>('product');
export const getProductList=createSelector(getProductState,(state)=>{
  return state.list;
})

export const getProduct=createSelector(getProductState,(state)=>{
  return state.editData;
})
