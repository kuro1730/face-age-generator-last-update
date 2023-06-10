import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpaConsentComponent } from './pdpa-consent.component';

describe('PdpaConsentComponent', () => {
  let component: PdpaConsentComponent;
  let fixture: ComponentFixture<PdpaConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdpaConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdpaConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
