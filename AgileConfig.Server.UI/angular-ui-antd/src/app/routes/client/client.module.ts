import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ClientRoutingModule } from './client-routing.module';
import { ClientHomeComponent } from './home/home.component';

const COMPONENTS: Type<void>[] = [
  ClientHomeComponent];

@NgModule({
  imports: [
    SharedModule,
    ClientRoutingModule
  ],
  declarations: COMPONENTS,
})
export class ClientModule { }
