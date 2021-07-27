import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursEComponent } from './cours-e.component';

describe('CoursEComponent', () => {
  let component: CoursEComponent;
  let fixture: ComponentFixture<CoursEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
