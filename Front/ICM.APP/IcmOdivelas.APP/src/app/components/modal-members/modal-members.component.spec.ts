import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMembersComponent } from './modal-members.component';

describe('ModalMembersComponent', () => {
  let component: ModalMembersComponent;
  let fixture: ComponentFixture<ModalMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMembersComponent]
    });
    fixture = TestBed.createComponent(ModalMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
