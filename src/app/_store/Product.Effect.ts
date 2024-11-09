import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  emptyAction,
  loadProducts,
  loadProductFail,
  loadProductSuccess,
  addProducts,
  addProductSuccess,
  getProducts,
  getProductSuccess,
  updateProducts,
  updateProductSuccess,
  deleteProducts,
  deleteProductSuccess
} from "./Product.Action";
import {catchError, exhaustMap, map, of, switchMap} from "rxjs";
import {ProductService} from "../service/product.service";
import {ToastrService} from "ngx-toastr";


@Injectable()
export class ProductEffect {
  constructor(private service: ProductService, private toastr: ToastrService) {
  }
  private action$ = inject(Actions);
  _loadproduct = createEffect(() =>
    this.action$.pipe(
      ofType(loadProducts),
      exhaustMap((action) => {
        return this.service.getAll().pipe(
          map((data) => {
            return loadProductSuccess({ list: data })
          }),
          catchError((err) => of(this.Showalert(err.message, 'fail')))
        )
      })
    )
  )

  _createproduct = createEffect(() =>
    this.action$.pipe(
      ofType(addProducts),
      switchMap((action) => {
        return this.service.createProduct(action.inputData).pipe(
          switchMap((data) => {
            return of(addProductSuccess({ inputData: action.inputData }),this.Showalert('Created successfully', 'pass'))
          }),
          catchError((err) => of(this.Showalert(err.message, 'fail')))
        )
      })
    )
  )

  _getproduct = createEffect(() =>
    this.action$.pipe(
      ofType(getProducts),
      switchMap((action) => {
        return this.service.getProductById(action.id).pipe(
          switchMap((data) => {
            return of(getProductSuccess({ obj: data }))
          }),
          catchError((err) => of(this.Showalert(err.message, 'fail')))
        )
      })
    )
  )

  _updateproduct = createEffect(() =>
    this.action$.pipe(
      ofType(updateProducts),
      switchMap((action) => {
        return this.service.updateProduct(action.inputData).pipe(
          switchMap((data) => {
            return of(updateProductSuccess({ inputData: action.inputData }),this.Showalert('Updated successfully', 'pass'))
          }),
          catchError((err) => of(this.Showalert(err.message, 'fail')))
        )
      })
    )
  )

  _removeproduct = createEffect(() =>
    this.action$.pipe(
      ofType(deleteProducts),
      switchMap((action) => {
        return this.service.deleteProductById(action.id).pipe(
          switchMap((data) => {
            return of(deleteProductSuccess({ id: action.id }),this.Showalert('Deleted successfully', 'pass'))
          }),
          catchError((err) => of(this.Showalert(err.message, 'fail')))
        )
      })
    )
  )

  Showalert(message: string, response: string) {
    if (response == 'pass') {
      this.toastr.success(message)
    } else {
      this.toastr.error(message)
    }
    return emptyAction();
  }

}
