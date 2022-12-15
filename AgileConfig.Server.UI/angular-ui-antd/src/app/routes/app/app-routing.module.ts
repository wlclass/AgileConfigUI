import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppConfigComponent } from './config/config.component';
import { AppHomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'config/:id', component: AppConfigComponent, data: { title: '配置贡' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
