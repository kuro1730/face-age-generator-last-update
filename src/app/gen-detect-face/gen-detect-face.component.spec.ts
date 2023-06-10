import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenDetectFaceComponent } from './gen-detect-face.component';

describe('GenDetectFaceComponent', () => {
  let component: GenDetectFaceComponent;
  let fixture: ComponentFixture<GenDetectFaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenDetectFaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenDetectFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
