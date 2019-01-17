import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleComercioPage } from './detalle-comercio';

@NgModule({
  declarations: [
    DetalleComercioPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleComercioPage),
  ],
})
export class DetalleComercioPageModule {}
