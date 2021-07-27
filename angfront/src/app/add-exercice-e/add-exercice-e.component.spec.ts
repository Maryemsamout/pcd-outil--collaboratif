import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExerciceEComponent } from './add-exercice-e.component';

describe('AddExerciceEComponent', () => {
  let component: AddExerciceEComponent;
  let fixture: ComponentFixture<AddExerciceEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExerciceEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExerciceEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
