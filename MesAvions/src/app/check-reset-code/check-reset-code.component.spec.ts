import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckResetCodeComponent } from './check-reset-code.component';

describe('CheckResetCodeComponent', () => {
  let component: CheckResetCodeComponent;
  let fixture: ComponentFixture<CheckResetCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckResetCodeComponent]
    });
    fixture = TestBed.createComponent(CheckResetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
