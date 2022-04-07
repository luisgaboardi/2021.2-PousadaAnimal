import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostingAnalysisComponent } from './hosting-analysis.component';

describe('HostingAnalysisComponent', () => {
  let component: HostingAnalysisComponent;
  let fixture: ComponentFixture<HostingAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostingAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostingAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
