import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { NodeHomeComponent } from './home/home.component';
import { NodeRoutingModule } from './node-routing.module';

const COMPONENTS: Array<Type<void>> = [NodeHomeComponent];

@NgModule({
  imports: [SharedModule, NodeRoutingModule],
  declarations: COMPONENTS
})
export class NodeModule {}
