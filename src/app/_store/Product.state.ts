import {ProductModel} from "../model/ProductStatemodel";

export const productState:ProductModel={
  list : [],
  errorMessage : "",
  editData: {
    id : 0,
    name :"",
    description : "",
    price : 0,
    status : false
  }
}
