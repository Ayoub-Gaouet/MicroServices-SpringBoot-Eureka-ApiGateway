import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvionComponent } from './add-avion.component';

describe('AddAvionComponent', () => {
  let component: AddAvionComponent;
  let fixture: ComponentFixture<AddAvionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAvionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAvionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
