import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationEComponent } from './information-e.component';

describe('InformationEComponent', () => {
  let component: InformationEComponent;
  let fixture: ComponentFixture<InformationEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
