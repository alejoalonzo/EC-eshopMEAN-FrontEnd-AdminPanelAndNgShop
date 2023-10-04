import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './Components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { HeroComponent } from './Components/hero/hero.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [BannerComponent, GalleryComponent, HeroComponent],
  exports: [BannerComponent, GalleryComponent, HeroComponent],
})
export class UiModule {}
