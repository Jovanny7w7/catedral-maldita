import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequisitosPage } from './requisitos.page';

describe('RequisitosPage', () => {
  let component: RequisitosPage;
  let fixture: ComponentFixture<RequisitosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
