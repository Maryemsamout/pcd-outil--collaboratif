import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentEComponent } from './comment-e.component';

describe('CommentEComponent', () => {
  let component: CommentEComponent;
  let fixture: ComponentFixture<CommentEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
