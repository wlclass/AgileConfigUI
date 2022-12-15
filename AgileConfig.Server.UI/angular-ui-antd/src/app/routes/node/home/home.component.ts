import { Component, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-node-home',
  templateUrl: './home.component.html'
})
export class NodeHomeComponent implements OnInit {
  constructor(private http: _HttpClient) { }

  ngOnInit(): void { }
  url = `/servernode/all`;
  columns: STColumn[] = [
    { title: '节点地址', index: 'address', width: '150px' },
    { title: '添加时间', index: 'createTime', type: 'date', width: '120px' },
    { title: 'lastEchoTime', index: 'lastEchoTime', render: 'lastEchoTime', type: 'date', width: '150px' },
    { title: '备注', index: 'remark', width: '80px' },
    { title: '状态', index: 'status', width: '150px' },
    {
      title: '操作',
      width: '150px',
      buttons: []
    }
  ];
}
