import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-banner',
  templateUrl: './banner.component.html',
  styleUrls: [],
})
export class BannerComponent {
  constructor(private router: Router, ) {}

  goToProductsPage(){
    this.router.navigate(['/products'])
  }
}
