import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './home/home.component';

const COMPONENTS: Type<void>[] = [
  UserHomeComponent];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: COMPONENTS,
})
export class UserModule { }
