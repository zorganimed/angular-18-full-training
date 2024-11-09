import {Product} from "./product.model";

export interface ProductModel{

  list : Product[],
  errorMessage : string,
  editData : Product
}
