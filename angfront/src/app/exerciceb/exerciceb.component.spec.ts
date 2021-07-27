import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicebComponent } from './exerciceb.component';

describe('ExercicebComponent', () => {
  let component: ExercicebComponent;
  let fixture: ComponentFixture<ExercicebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercicebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
