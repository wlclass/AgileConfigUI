import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeHomeComponent } from './home.component';

describe('NodeHomeComponent', () => {
  let component: NodeHomeComponent;
  let fixture: ComponentFixture<NodeHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
