import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageLoaderDirective } from './image-loader/image-loader.directive';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    ImageLoaderDirective,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ImageLoaderDirective,
    SpinnerComponent
  ]
})
export class SharedModule { }
