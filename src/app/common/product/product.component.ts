import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/product.model";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AddProductComponent} from "../add-product/add-product.component";
import {catchError, of, Subscription} from "rxjs";
import {ConfirmComponent} from "../../dialogs/confirm/confirm.component";
import {DialogService} from "../../service/dialog.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatPaginatorModule,
  MatSortModule, MatButtonModule, MatInputModule,
  CommonModule, MatDialogModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy{

  displayedColumns: string[] = ['id', 'name', 'description', 'price','status', 'action'];
  dataSource! : MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription = new Subscription();

  products : Product[] = [];
  constructor(private productService : ProductService,
              private dialog : MatDialog,
              private dialogService: DialogService,
              private toastr :ToastrService) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProducts(){
    /*let sub1 = this.productService.getAll().subscribe(item=>{
      this.products = item;

      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })*/
    let sub1 = this.productService.getAll().pipe(
      catchError(err=>{
        return of(([]))
      })
    ).subscribe(item=>{
      this.products = item;

      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.subscription.add(sub1);
  }


  createProduct() {
    this.openPopUp(0,'Create Product');
  }

  openPopUp(id : number, title :string){
    this.dialog.open(AddProductComponent,{
      width: '40%',
      enterAnimationDuration : '1000ms',
      exitAnimationDuration : '1000ms',
      data:{
        id : id,
        title : title
      }
    }).afterClosed().subscribe(item=>{
      this.loadProducts();
    });
  }

  editProduct(id : number) {
    this.openPopUp(id, 'Edit Product')
  }

  deleteProduct(id : number) {
    //if(confirm('Do you want to remove ')){
      let sub2 = this.productService.deleteProductById(id).subscribe(item=>{
        this.toastr.success('Removed successfully','Success')
        this.loadProducts();
      });
      this.subscription.add(sub2);
   // }
  }

  readonly dialogConfirm = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id : number): void {
    this.dialogConfirm.open(ConfirmComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration
    }).afterClosed().subscribe(item=>{
      if(this.dialogService.name != ""){
        this.deleteProduct(id);
      }
    });
  }

}
