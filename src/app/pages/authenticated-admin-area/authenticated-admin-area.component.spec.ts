import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedAdminAreaComponent } from './authenticated-admin-area.component';

describe('AuthenticatedAdminAreaComponent', () => {
  let component: AuthenticatedAdminAreaComponent;
  let fixture: ComponentFixture<AuthenticatedAdminAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatedAdminAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticatedAdminAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
