import { Component } from '@angular/core';
import { AuthenticationService } from '@bluebits/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private authServise: AuthenticationService) {}

  logoutUser(){
    this.authServise.logout();
  }

}
