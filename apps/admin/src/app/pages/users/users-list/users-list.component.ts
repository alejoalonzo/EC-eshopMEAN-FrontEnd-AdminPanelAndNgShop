import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, User } from '@bluebits/users'
import { MessageService, ConfirmationService, ConfirmEventType  } from 'primeng/api';
import { from } from 'rxjs';


@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: [],
})
export class UsersListComponent implements OnInit {

  users: User[] =[];
  constructor(
    private usersService: UsersService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(()=>{
          this._getUsers ();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is deleted successfuly' });
        },
        ()=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not created successfuly ' });
        });
      },
      reject: (type: unknown) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  break;
          }
      }
    });
  }

  editUser(userId: string){
    this.router.navigateByUrl(`users/form/${userId}`)
  }
  private _getUsers (){
    this.usersService.getUsers().subscribe((users)=>{
      this.users = users;
    })
  }
  
}
