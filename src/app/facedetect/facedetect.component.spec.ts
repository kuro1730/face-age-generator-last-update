import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacedetectComponent } from './facedetect.component';

describe('FacedetectComponent', () => {
  let component: FacedetectComponent;
  let fixture: ComponentFixture<FacedetectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacedetectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacedetectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
