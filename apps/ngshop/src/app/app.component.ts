import { Component } from '@angular/core';
import { UsersService } from '@bluebits/users';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
})
export class AppComponent{

  constructor(private usersService: UsersService){}

  title = 'ngshop';
  
  // ngOnInit(): void {
  //     this.usersService.initappStore()
  // }
}
