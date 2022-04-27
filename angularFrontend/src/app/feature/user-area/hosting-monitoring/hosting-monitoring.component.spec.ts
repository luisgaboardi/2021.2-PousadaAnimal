import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostingMonitoringComponent } from './hosting-monitoring.component';

describe('HostingMonitoringComponent', () => {
  let component: HostingMonitoringComponent;
  let fixture: ComponentFixture<HostingMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostingMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostingMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
