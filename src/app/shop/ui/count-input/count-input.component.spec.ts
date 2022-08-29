import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { fireEvent, screen } from '@testing-library/angular';
import { appMinusIcon } from '../../../icons/minus';
import { appPlusIcon } from '../../../icons/plus';
import { CountInputComponent } from './count-input.component';

describe('CountInputComponent', () => {
  let component: CountInputComponent;
  let fixture: ComponentFixture<CountInputComponent>;

  let minusButton: HTMLElement;
  let plusButton: HTMLElement;
  let valueDebug: DebugElement;

  function getInputValue() {
    return valueDebug.nativeElement.textContent;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountInputComponent],
      imports: [
        SvgIconsModule.forRoot({
          icons: [appMinusIcon, appPlusIcon],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountInputComponent);
    component = fixture.componentInstance;
    valueDebug = fixture.debugElement.query(By.css('span'));
    plusButton = screen.getByTestId('plus');
    minusButton = screen.getByTestId('minus');
  });

  it('should add value on plus', () => {
    fixture.detectChanges();

    expect(getInputValue()).toBe('0');

    fireEvent.click(plusButton);
    fixture.detectChanges();

    expect(getInputValue()).toBe('1');
  });

  it('should decrement value on minus', () => {
    component.value = 1;
    fixture.detectChanges();

    expect(getInputValue()).toBe('1');

    fireEvent.click(minusButton);
    fixture.detectChanges();

    expect(getInputValue()).toBe('0');
  });

  it('should hide plus if max setted', () => {
    component.max = 5;
    component.value = 4;

    fixture.detectChanges();

    expect(getInputValue()).toBe('4');

    expect(Object.values(plusButton.classList)).not.toContain('invisible');

    fireEvent.click(plusButton);
    fixture.detectChanges();

    expect(getInputValue()).toBe('5');
    expect(Object.values(plusButton.classList)).toContain('invisible');

    fireEvent.click(plusButton);
    fixture.detectChanges();

    expect(getInputValue()).toBe('5');
  });

  it('should hide minus if min setted', () => {
    component.min = 0;
    component.value = 1;

    fixture.detectChanges();

    expect(getInputValue()).toBe('1');

    expect(Object.values(minusButton.classList)).not.toContain('invisible');

    fireEvent.click(minusButton);
    fixture.detectChanges();

    expect(getInputValue()).toBe('0');
    expect(Object.values(minusButton.classList)).toContain('invisible');

    fireEvent.click(minusButton);
    fixture.detectChanges();

    expect(getInputValue()).toBe('0');
  });

  it('should fix value if max set', () => {
    component.value = 10;
    fixture.detectChanges();

    component.max = 5;
    fixture.detectChanges();

    expect(component.value).toBe(5);
  });

  it('should fix value if min set', () => {
    component.value = 5;
    fixture.detectChanges();

    component.min = 10;
    fixture.detectChanges();

    expect(component.value).toBe(10);
  });

  it('should emit on change', () => {
    const plusClickSpy = jest.spyOn(component.plusClick, 'emit');
    const minusClickSpy = jest.spyOn(component.minusClick, 'emit');

    fireEvent.click(plusButton);
    expect(plusClickSpy).toHaveBeenCalledTimes(1);

    fireEvent.click(minusButton);
    expect(minusClickSpy).toHaveBeenCalledTimes(1);
  });
});
