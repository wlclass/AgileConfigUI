import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NodeHomeComponent } from './home/home.component';

const routes: Routes = [{ path: '', component: NodeHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NodeRoutingModule {}
