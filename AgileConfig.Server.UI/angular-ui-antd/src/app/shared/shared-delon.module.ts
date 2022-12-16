import { EllipsisModule } from '@delon/abc/ellipsis';
import { PageHeaderModule } from '@delon/abc/page-header';
import { ResultModule } from '@delon/abc/result';
import { SEModule } from '@delon/abc/se';
import { STModule } from '@delon/abc/st';
import { SVModule } from '@delon/abc/sv';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDividerModule } from 'ng-zorro-antd/divider';
export const SHARED_DELON_MODULES = [
  NzBreadCrumbModule,
  EllipsisModule,
  NzDividerModule,
  PageHeaderModule,
  STModule,
  SEModule,
  SVModule,
  ResultModule
];
