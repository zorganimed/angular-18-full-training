import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {Product} from "../../model/product.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,MatFormFieldModule,
  MatInputModule, MatCheckboxModule, MatCardModule,
  MatButtonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

  productForm! : FormGroup;
  _dialogData : any;
  _productInfo! : Product;
  constructor(private productService: ProductService,
              private fb : FormBuilder,
              private ref : MatDialogRef<AddProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any,
              private toastr :ToastrService) {
  }

  ngOnInit(): void {
   this.productForm = this.fb.group({

     id : this.fb.control({value:0, disabled:true}),
     name: this.fb.control('',Validators.required),
     description: this.fb.control(''),
     price : this.fb.control(1),
     status:this.fb.control(true)
   });

   this._dialogData = this.data;
   console.log(this._dialogData)
   let editId =  this._dialogData.id as number;
   if(editId!=0){
     this.productService.getProductById(this._dialogData.id).subscribe(item=>{
       this._productInfo = item;
       this.productForm.setValue({
         id : this._productInfo.id,
         name : this._productInfo.name,
         description : this._productInfo.description,
         price : this._productInfo.price,
         status : this._productInfo.status
       })
     })
   }
  }

  proceedSave() {
    if(this.productForm.valid){
      let _data : Product={
        id : 0,
        name : this.productForm.value.name as string,
        description : this.productForm.value.description as string,
        price : this.productForm.value.price as number,
        status : this.productForm.value.status as boolean
      }

       if(this._dialogData.id != 0){
        _data.id = this._dialogData.id as number;
        this.productService.updateProduct(_data).subscribe(item=>{
          this.toastr.success('Update successfully','Success');
          //alert('Update successfully');
        })
      }else{
        this.productService.createProduct(_data).subscribe(item=>{
          this.toastr.success('Created successfully','Success')
          //alert('Created successfully');
        })
      }
      this.productForm.reset();
      this.cancelPopUp();

    }
  }

  cancelPopUp() {
    this.ref.close();
  }
}
