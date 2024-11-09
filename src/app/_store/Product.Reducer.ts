import {createReducer, on} from "@ngrx/store";
import {productState} from "./Product.state";
import {
  addProductSuccess, deleteProductSuccess,
  getProductSuccess,
  loadProductFail,
  loadProductSuccess,
  updateProductSuccess
} from "./Product.Action";


const _productReducer=createReducer(productState,
  on(loadProductSuccess,(state,action)=>{
    return{
      ...state,
      list:action.list,
      errorMessage:''
    }
}),
  on(loadProductFail,(state,action)=>{
    return{
      ...state,
      list:[],
      errorMessage:action.errorMessage
    }
  }),
  on(addProductSuccess,(state,action)=>{
    const _maxId = Math.max(...state.list.map(o=>o.id));
    const _newData = {...action.inputData};
    _newData.id=_maxId+1;
    return{
      ...state,
      list:[...state.list,_newData],
      errorMessage:'',

    }
  }),on(getProductSuccess,(state,action)=>{
    return{
      ...state,
      errorMessage:'',
      editData: action.obj
    }
  }),on(updateProductSuccess,(state,action)=>{
    const _newData = state.list.map(o=>{
      return o.id===action.inputData.id ? action.inputData:o
    });
    return{
      ...state,
      list:_newData,
      errorMessage:'',

    }
  }),on(deleteProductSuccess,(state,action)=>{
    const _newData = state.list.filter(o=>
      o.id !== action.id
    );
    return{
      ...state,
      list:_newData,
      errorMessage:'',

    }
  })
  )


export function productReducer(state : any, action : any){
  return _productReducer(state, action);
}
