import { Component, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-client-home',
  templateUrl: './home.component.html'
})
export class ClientHomeComponent implements OnInit {
  constructor(private http: _HttpClient) { }

  ngOnInit(): void { }
  url = `/report/SearchServerNodeClients`;
  columns: STColumn[] = [
    { title: 'ID', index: 'id', width: '150px' },
    { title: '节点', index: 'address', width: '120px' },
    { title: '应用ID', index: 'appId', width: '150px' },
    { title: '环境', index: 'env', width: '80px' },
    { title: 'IP', index: 'ip', width: '150px' },
    { title: '名称', index: 'name', width: '100px' },
    { title: '操作系统', index: 'os', width: '150px' },
    { title: '容器化', index: 'isDocker', width: '80px' },
    { title: 'tag', index: 'inheritanced', width: '150px' },
    { title: '更新时间', index: 'lastHeartbeatTime', render: 'lastHeartbeatTime', type: 'date', width: '150px' },
    {
      title: '操作',
      width: '150px',
      buttons: []
    }
  ];
}
