import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTabbedPage } from './home-tabbed.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTabbedPage,
    children: [
      {
        path: 'user-list-tab',
        loadChildren: () => import('../user-list-tab/user-list.module').then(m => m.UserListTabPageModule)
      },
      {
        path: 'profile-tab',
        loadChildren: () => import('../profile-tab/profile-tab.module').then(m => m.ProfileTabPageModule)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeTabbedPageRoutingModule {}
