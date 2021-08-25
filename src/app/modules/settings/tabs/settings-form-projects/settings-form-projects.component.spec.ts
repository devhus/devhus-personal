import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFormProjectsComponent } from './settings-form-projects.component';

describe('SettingsFormProjectsComponent', () => {
  let component: SettingsFormProjectsComponent;
  let fixture: ComponentFixture<SettingsFormProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsFormProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFormProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
