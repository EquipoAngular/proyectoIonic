import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTabbedPageRoutingModule } from './home-tabbed-routing.module';

import { HomeTabbedPage } from './home-tabbed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTabbedPageRoutingModule
  ],
  declarations: [HomeTabbedPage]
})
export class HomeTabbedPageModule {}
