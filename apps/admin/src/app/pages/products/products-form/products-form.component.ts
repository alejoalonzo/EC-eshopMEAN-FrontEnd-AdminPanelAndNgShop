import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category, Product, ProductsService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: [],
})

export class ProductsFormComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  form!: FormGroup;
  editMode!: boolean;
  isSubmitted!: boolean;
  categories: Category[] =[]; 
  imageDisplay!: string | ArrayBuffer;
  currentProductyId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private messageService: MessageService,
    private locations: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditModeProducts();
  }
  private _initForm(){
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      brand:['', Validators.required],
      price:['', Validators.required],
      category:['', Validators.required],
      countInStock:['', Validators.required],
      description:[''],
      richDescription:[''],
      image:['', Validators.required],
      isFeatured:[false]
    })
  }
  private _getCategories(){
    this.categoriesService.getCategories().subscribe(categories=>{
      this.categories = categories;
    })
  }
  get productForm(){
    return this.form.controls
  }

  onUpload(event: any) {
    const file = event.files[0];
    if (file) {
      this.form.patchValue({image: file});
      const imageControl = this.form.get('image');
      if (imageControl) {
        imageControl.updateValueAndValidity();
      }
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result !== null) {
          this.imageDisplay = fileReader.result.toString();
        } else {
          this.imageDisplay = 'default-image.jpg';
        }
      };
      fileReader.readAsDataURL(file);
    }
  }
  

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.valid){
      const productFormData = new FormData;

      Object.keys(this.productForm).map((key)=>{
        productFormData.append(key, this.productForm[key].value);
        console.log(key);
      })
      
      if(this.editMode){
        this._updateProduct(productFormData);
      }else{
        this._addProducts(productFormData)
      }
      
    }
  }

  private _updateProduct(productData: FormData){
    this.productService.updateProduct(productData, this.currentProductyId).subscribe((productData)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${productData.name} is updated successfuly` });
      timer(2000).toPromise().then(()=>{
        this.locations.back();
      })
    },
    ()=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Product ${name} is not updated successfuly` });
    });
  }

  private _addProducts(productData: FormData){
    this.productService.createProduct(productData).subscribe((productData: Product)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${productData.name} is created successfuly` });
      timer(1000).toPromise().then(()=>{
        this.locations.back();
      })
    },
    ()=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Product ${name} is not created successfuly` });
    });
  }
  goBack(){
    this.locations.back();
  }

  private _checkEditModeProducts(){
    this.route.params.subscribe((params)=>{
      if(params['id']){
        this.editMode= true;
        this.currentProductyId = params['id']
        this.productService.getProduct(params['id']).subscribe(product=>{
          this.form.controls['name'].setValue(product['name']);
          if (product['category']){
            this.form.controls['category'].setValue(product['category']._id);
          }
          this.form.controls['brand'].setValue(product['brand']);
          this.form.controls['price'].setValue(product['price']);
          this.form.controls['countInStock'].setValue(product['countInStock']);
          this.form.controls['isFeatured'].setValue(product['isFeatured']);
          this.form.controls['description'].setValue(product['description']);
          this.form.controls['richDescription'].setValue(product['richDescription']);
          this.imageDisplay = product['image'] || '';
          this.productForm['image'].setValidators([]);
          this.productForm['image'].updateValueAndValidity();
        })
      }
    })
  }
}
