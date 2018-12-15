import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarComercioPage } from './editar-comercio';

@NgModule({
  declarations: [
    EditarComercioPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarComercioPage),
  ],
})
export class EditarComercioPageModule {}
