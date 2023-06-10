import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTaskComponent } from './result-task.component';

describe('ResultTaskComponent', () => {
  let component: ResultTaskComponent;
  let fixture: ComponentFixture<ResultTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
