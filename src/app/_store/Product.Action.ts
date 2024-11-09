import {createAction, props} from "@ngrx/store";
import {Product} from "../model/product.model";

export const LOAD_PRODUCTS='[product] load products'
export const LOAD_PRODUCTS_SUCCESS='[product] load products success'
export const LOAD_PRODUCTS_FAIL = '[product] load products fail'

export const ADD_PRODUCTS='[product] add products'
export const ADD_PRODUCTS_SUCCESS='[product] add products success'

export const GET_PRODUCTS='[product] get products'
export const GET_PRODUCTS_SUCCESS='[product] get products success'

export const UPDATE_PRODUCTS = '[product] update products'
export const UPDATE_PRODUCTS_SUCCESS = '[product] update products success'

export const DELETE_PRODUCTS='[product] delete products'
export const DELETE_PRODUCTS_SUCCESS='[product] delete products success'



export const loadProducts=createAction(LOAD_PRODUCTS);
export const loadProductSuccess=createAction(LOAD_PRODUCTS_SUCCESS, props<{list:Product[]}>());
export const loadProductFail = createAction(LOAD_PRODUCTS_FAIL, props<{ errorMessage: string }>())

export const addProducts=createAction(ADD_PRODUCTS,props<{inputData : Product}>());
export const addProductSuccess=createAction(ADD_PRODUCTS_SUCCESS, props<{inputData : Product}>());

export const getProducts=createAction(GET_PRODUCTS,props<{id : number}>());
export const getProductSuccess=createAction(GET_PRODUCTS_SUCCESS, props<{obj : Product}>());

export const updateProducts = createAction(UPDATE_PRODUCTS, props<{ inputData: Product }>());
export const updateProductSuccess = createAction(UPDATE_PRODUCTS_SUCCESS,props<{ inputData: Product }>())

export const deleteProducts=createAction(DELETE_PRODUCTS,props<{id : number}>());
export const deleteProductSuccess=createAction(DELETE_PRODUCTS_SUCCESS, props<{id : number}>());

export const emptyAction = createAction('empty');

