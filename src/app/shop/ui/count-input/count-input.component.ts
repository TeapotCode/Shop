import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-count-input',
  templateUrl: './count-input.component.html',
  styleUrls: ['./count-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountInputComponent implements ControlValueAccessor {
  value: number = 0;
  disabled = false;
  onChanged = (val: number) => {};
  onTouched = () => {};
  _max: number = Infinity;
  _min: number = 0;

  @Output() plusClick = new EventEmitter<void>();
  @Output() minusClick = new EventEmitter<void>();

  @Input()
  set min(valueIn: number) {
    this._min = valueIn;
    if (this.value < this._min) this.writeValue(this._min);
  }

  @Input()
  set max(valueIn: number) {
    this._max = valueIn;
    if (this.value > this._max) this.writeValue(this._max);
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: number): void {
    this.value = obj;
    this.onChanged(obj);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  minus() {
    if (this.value > this._min) {
      this.writeValue(this.value - 1);
      this.minusClick.emit();
    }
  }

  plus() {
    if (this.value < this._max) {
      this.writeValue(this.value + 1);
      this.plusClick.emit();
    }
  }
}
