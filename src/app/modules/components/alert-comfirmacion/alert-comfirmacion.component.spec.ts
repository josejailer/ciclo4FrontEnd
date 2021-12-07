import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComfirmacionComponent } from './alert-comfirmacion.component';

describe('AlertComfirmacionComponent', () => {
  let component: AlertComfirmacionComponent;
  let fixture: ComponentFixture<AlertComfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertComfirmacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
