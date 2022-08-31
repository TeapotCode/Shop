import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change class on input', () => {
    const button = fixture.nativeElement as HTMLElement;

    expect(button.classList.contains('primary')).toBe(false);
    expect(button.classList.contains('base')).toBe(true);

    component.type = 'primary';

    fixture.detectChanges();

    expect(button.classList.contains('primary')).toBe(true);
    expect(button.classList.contains('base')).toBe(false);
  });
});
