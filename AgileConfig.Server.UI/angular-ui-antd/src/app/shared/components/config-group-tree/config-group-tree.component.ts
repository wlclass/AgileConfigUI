import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTreeComponent, NzTreeNodeOptions, NzFormatEmitEvent } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-config-group-tree',
  templateUrl: './config-group-tree.component.html',
  styles: []
})
export class ConfigGroupTreeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent!: NzTreeComponent;
  defaultCheckedKeys = ['10020'];
  defaultSelectedKeys = ['10010'];
  defaultExpandedKeys = ['100', '1001'];
  nodes: NzTreeNodeOptions[] = [
    {
      title: '根节点',
      key: '100',
      children: [
        {
          title: 'ConnectionStrings',
          key: '1001',
          disabled: false,
          isLeaf: true
        },
        {
          title: 'config',
          key: '1002',
          expanded: true,
          children: [
            {
              title: 'xjtaskconfig',
              key: '10020',
              isLeaf: false,
              expanded: true,
              children: [
                {
                  title: 'Items',
                  key: '10020',
                  isLeaf: false,
                  expanded: true,
                  children: [
                    {
                      title: '1',
                      key: '10020',
                      isLeaf: true,
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'Redis',
          key: '1001',
          disabled: false,
          isLeaf: false,
          expanded: true,
          children: [
            {
              title: 'Writer',
              key: '1001',
              disabled: false,
              isLeaf: true,
              children: []
            },
            {
              title: 'Reader',
              key: '1001',
              disabled: false,
              isLeaf: true,
              children: []
            }
          ]
        },
        {
          title: 'Logging',
          key: '1001',
          disabled: false,
          isLeaf: false,
          expanded: true,
          children: [
            {
              title: 'LogLevel',
              key: '1001',
              disabled: false,
              isLeaf: true,
              children: []
            }
          ]
        }
      ]
    }
  ];

  nzClick(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  // nzSelectedKeys change
  nzSelect(keys: string[]): void {
    console.log(keys, this.nzTreeComponent.getSelectedNodeList());
  }

  ngAfterViewInit(): void {
    // get node by key: '10011'
    console.log(this.nzTreeComponent.getTreeNodeByKey('10011'));
    // use tree methods
    console.log(
      this.nzTreeComponent.getTreeNodes(),
      this.nzTreeComponent.getCheckedNodeList(),
      this.nzTreeComponent.getSelectedNodeList(),
      this.nzTreeComponent.getExpandedNodeList()
    );
  }
}
