import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFormResumeComponent } from './settings-form-resume.component';

describe('SettingsFormResumeComponent', () => {
  let component: SettingsFormResumeComponent;
  let fixture: ComponentFixture<SettingsFormResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsFormResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFormResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
