import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserListTabPage } from './user-list.page';
import { UserListTabPageRoutingModule } from './user-list-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UserListTabPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UserListTabPage]
})
export class UserListTabPageModule {}
