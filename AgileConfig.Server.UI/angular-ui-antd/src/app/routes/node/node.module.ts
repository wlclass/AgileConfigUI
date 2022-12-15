import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { NodeRoutingModule } from './node-routing.module';
import { NodeHomeComponent } from './home/home.component';

const COMPONENTS: Type<void>[] = [
  NodeHomeComponent];

@NgModule({
  imports: [
    SharedModule,
    NodeRoutingModule
  ],
  declarations: COMPONENTS,
})
export class NodeModule { }
