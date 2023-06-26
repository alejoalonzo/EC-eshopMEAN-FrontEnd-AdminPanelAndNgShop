import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@bluebits/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(private authServise: AuthenticationService) {}

  ngOnInit(): void {
    console.log()
  }
  logoutUser(){
    this.authServise.logout();
  }

}
