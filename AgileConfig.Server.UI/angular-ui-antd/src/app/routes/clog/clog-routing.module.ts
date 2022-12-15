import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClogHomeComponent } from './home/home.component';

const routes: Routes = [{ path: '', component: ClogHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClogRoutingModule { }
