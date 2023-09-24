import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './Components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './Components/gallery/gallery.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [BannerComponent, GalleryComponent],
  exports: [BannerComponent, GalleryComponent],
})
export class UiModule {}
