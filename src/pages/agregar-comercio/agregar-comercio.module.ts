import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarComercioPage } from './agregar-comercio';

@NgModule({
  declarations: [
    AgregarComercioPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarComercioPage),
  ],
})
export class AgregarComercioPageModule {}
