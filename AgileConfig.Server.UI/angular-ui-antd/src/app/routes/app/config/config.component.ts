/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STColumn, STColumnBadge, STColumnTag } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { copy } from '@delon/util';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppAuthComponent } from 'src/app/shared/components/app-auth/app-auth.component';
import { AppEditorComponent } from 'src/app/shared/components/app-editor/app-editor.component';
import { ConfigItemEditorComponent } from 'src/app/shared/components/config-item-editor/config-item-editor.component';
import { ConfigItemHistoryComponent } from 'src/app/shared/components/config-item-history/config-item-history.component';
const 编辑状态: STColumnTag = {
  0: { text: '新增', color: 'warning' },
  1: { text: '已编辑', color: 'warning' },
  2: { text: '已删除', color: 'error' },
  10: { text: '已提交', color: 'success' }
};
const 发布状态: STColumnBadge = {
  0: { text: '待发布', color: 'warning' },
  1: { text: '已发布', color: 'processing' }
};
@Component({
  selector: 'app-app-config',
  templateUrl: './config.component.html'
})
export class AppConfigComponent implements OnInit {
  constructor(public msg: NzMessageService, private router: Router, private http: _HttpClient) {}

  envs = ['DEV', 'TEST', 'STAGING', 'PROD'];
  publishStatus = [0, 1];

  ngOnInit(): void {}
  doPublish() {}
  count = {
    add: 10,
    edit: 12,
    del: 3
  };
  url = `/config/search?env=DEV&appId=这是应用id&sortField=createTime&ascOrDesc=descend`;
  params: any = {
    appName: '测试应用',
    onlineStatus: 'all',
    env: 'DEV'
  };

  columns: STColumn[] = [
    // { title: '环境', index: 'env', width: '80px' },
    { title: '', type: 'checkbox', width: '50px' },
    { title: '组', index: 'group', render: 'group', width: '120px' },
    { title: '键', index: 'key', render: 'key', width: '150px' },
    { title: '值', index: 'value', render: 'value', width: '150px' },
    { title: '描述', index: 'description', render: 'description' },
    { title: '创建时间', index: 'createTime', type: 'date', width: '150px' },
    { title: '修改时间', index: 'updateTime', render: 'updateTime', type: 'date', width: '100px' },
    { title: '编辑状态', index: 'editStatus', width: '80px', type: 'tag', tag: 编辑状态 },
    { title: '发布状态', index: 'onlineStatus', width: '80px', type: 'badge', badge: 发布状态 },
    // { title: '状态', index: 'status', width: '80px' },
    {
      title: '操作',
      width: '150px',
      buttons: [
        {
          tooltip: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: ConfigItemEditorComponent
          },
          click: (_record, modal) => this.msg.success(`重新加载页面，回传值：${JSON.stringify(modal)}`)
        },
        {
          tooltip: '删除',
          icon: 'delete',
          type: 'del',
          pop: {
            title: '您确定要删除这个配置项吗?',
            okType: 'danger',
            icon: 'exclamation-circle'
          },
          click: (record, _modal, comp) => {
            this.msg.success(`成功删除【${record.name}】`);
            comp!.removeRow(record);
          }
        },
        {
          tooltip: '历史记录',
          icon: 'clock-circle',
          type: 'modal',
          modal: {
            component: ConfigItemHistoryComponent
          },
          click: (_record, modal) => this.msg.success(`重新加载页面，回传值：${JSON.stringify(modal)}`)
        },
        {
          tooltip: '撤消编辑',
          icon: 'undo',
          type: 'del',
          pop: {
            title: '您确定要撤消上一个编辑吗?',
            okType: 'danger',
            icon: 'exclamation-circle'
          },
          click: (record, _modal, comp) => {
            this.msg.success(`成功删除【${record.name}】`);
            comp!.removeRow(record);
          },
          iif: (item, b, c) => item.editStatus !== 10
        }
      ]
    }
  ];

  copy(data: any) {
    copy(data).then((res: any) => {
      this.msg.success(`复制成功！`);
    });
  }
}
