import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEComponent } from './question-e.component';

describe('QuestionEComponent', () => {
  let component: QuestionEComponent;
  let fixture: ComponentFixture<QuestionEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
