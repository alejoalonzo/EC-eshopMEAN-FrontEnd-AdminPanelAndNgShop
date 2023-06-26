import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from '@bluebits/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';

declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: [],
})
export class UsersFormComponent implements OnInit {

  userForm!: FormGroup;
  isSubmitted!: boolean;
  editMode!: boolean;
  users: User[] =[];
  countries: { id: string; name: string; }[] = [];
  boolean=false
  currentUserId!: string;
  


  constructor(
    private formBuilder: FormBuilder, 
    private messageService: MessageService, 
    private usersService: UsersService,
    private locations: Location,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._initFormUser();
    this._checkEditModeUser();
    this._getUsers();
    this._getCountries();
  }

  private _initFormUser(){
    this.userForm = this.formBuilder.group({
      name:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required],
      isAdmin:[false],
      phone:['', Validators.required],
      street:[''],
      number:[''],
      zip:[''],
      city:[''],
      country:[''],
    })
  }
  get userFormu(){
    return this.userForm.controls
  }

  goBack(){
    this.locations.back();
  }

  onSubmit(){
    this.isSubmitted=true;
    if(this.userForm.invalid){
      return;
    }
    const userFormData: User = {
      id: this.currentUserId,
      name: this.userForm.controls['name'].value,
      email: this.userForm.controls['email'].value,
      isAdmin: this.userForm.controls['isAdmin'].value,
      password: this.userForm.controls['password'].value,
      phone: this.userForm.controls['phone'].value,
      street: this.userForm.controls['street'].value,
      number: this.userForm.controls['number'].value,
      zip: this.userForm.controls['zip'].value,
      city: this.userForm.controls['city'].value,
      country: this.userForm.controls['country'].value,
    }
    if(this.editMode){
      this._updateUser(userFormData);
    }else{
      this._addUser(userFormData)
    }
  }

  private _updateUser(userData: User){
    this.usersService.updateUser(userData, this.currentUserId).subscribe((user)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `User ${user.name} is updated successfuly` });
      timer(2000).toPromise().then(()=>{
        this.locations.back();
      })
    },
    ()=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `User ${name} is not updated successfuly` });
    });
  }

  private _addUser(user: User){
    this.usersService.createUser(user).subscribe((user: User)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `User ${user.name} is created successfuly` });
      timer(1000).toPromise().then(()=>{
        this.locations.back();
      })
    },
    ()=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `User ${name} is not created successfuly` });
    });
  }

  private _getUsers(){
    this.usersService.getUsers().subscribe(users=>{
      this.users = users;
    })
  }
  //need to install npm 'i18n-iso-countries'
  private _getCountries(){
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries =Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry=>{
      return {
        id: entry[0],
        name: entry[1]
      } 
    })
  }


  private _checkEditModeUser(){
    this.route.params.subscribe((params)=>{
      if(params['id']){
        this.editMode= true;
        this.currentUserId = params['id']
        this.usersService.getUser(params['id']).subscribe(user=>{
          this.userForm.controls['name'].setValue(user['name']);
          this.userForm.controls['email'].setValue(user['email']);
          this.userForm.controls['isAdmin'].setValue(user['isAdmin']);
          //this.userForm.controls['passwordHash'].setValue(user['passwordHash']);
          this.userForm.controls['phone'].setValue(user['phone']);
          this.userForm.controls['street'].setValue(user['street']);
          this.userForm.controls['number'].setValue(user['number']);
          this.userForm.controls['zip'].setValue(user['zip']);
          this.userForm.controls['city'].setValue(user['city']);
          this.userForm.controls['country'].setValue(user['country'] ? user['country'] : null); 

          this.userFormu['password'].setValidators([]);
          this.userFormu['password'].updateValueAndValidity();
        })
      }
    })
  }
}


