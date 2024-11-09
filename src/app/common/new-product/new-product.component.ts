import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Product} from "../../model/product.model";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {ProductService} from "../../service/product.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AddProductComponent} from "../add-product/add-product.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {deleteProducts, loadProducts} from "../../_store/Product.Action";
import {getProductList} from "../../_store/Product.Selector";
import {AddNewProductComponent} from "../add-new-product/add-new-product.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatButtonModule, MatInputModule,
    CommonModule, MatDialogModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit, OnDestroy{

  displayedColumns: string[] = ['id', 'name', 'description', 'price','status', 'action'];
  dataSource! : MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription !: Subscription;

  products : Product[] = [];
  constructor(private dialog : MatDialog,
              private store : Store) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProducts(){
    /*this.productService.getAll().subscribe(item=>{
      this.products = item;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })*/
    this.store.dispatch(loadProducts());
    this.subscription = this.store.select(getProductList).subscribe(item=>{
      this.products = item;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  createProduct() {
    this.openPopUp(0,'Create Product');
  }

  openPopUp(id : number, title :string){
    this.dialog.open(AddNewProductComponent,{
      width: '40%',
      enterAnimationDuration : '1000ms',
      exitAnimationDuration : '1000ms',
      data:{
        id : id,
        title : title
      }
    }).afterClosed().subscribe(item=>{
      //this.loadProducts();
    });
  }

  editProduct(id : number) {
    this.openPopUp(id, 'Edit Product')
  }

  deleteProduct(id : number) {
    if(confirm('Do you want to remove ')){
      this.store.dispatch(deleteProducts({id : id}))
    }
  }
}
