import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClogHomeComponent } from './home.component';

describe('ClogHomeComponent', () => {
  let component: ClogHomeComponent;
  let fixture: ComponentFixture<ClogHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClogHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClogHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
