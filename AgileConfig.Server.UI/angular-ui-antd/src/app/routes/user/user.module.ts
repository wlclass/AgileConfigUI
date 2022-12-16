import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { UserHomeComponent } from './home/home.component';
import { UserRoutingModule } from './user-routing.module';

const COMPONENTS: Array<Type<void>> = [UserHomeComponent];

@NgModule({
  imports: [SharedModule, UserRoutingModule],
  declarations: COMPONENTS
})
export class UserModule {}
