import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFormInfoComponent } from './settings-form-info.component';

describe('SettingsFormInfoComponent', () => {
  let component: SettingsFormInfoComponent;
  let fixture: ComponentFixture<SettingsFormInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsFormInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFormInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
