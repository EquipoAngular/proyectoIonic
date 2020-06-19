import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListTabPage } from './user-list.page';

const routes: Routes = [
  {
    path: '',
    component: UserListTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListTabPageRoutingModule {}
