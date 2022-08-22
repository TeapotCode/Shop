import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {max} from "rxjs";

@Component({
  selector: 'app-count-input',
  templateUrl: './count-input.component.html',
  styleUrls: ['./count-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CountInputComponent
    }
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountInputComponent implements ControlValueAccessor {

  value: number = 0
  disabled = false;
  private onChanged!: Function;
  private onTouched!: Function
  @Input() max: number = Infinity;

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: number): void {
    this.value = obj;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled
  }

  minus() {
    if(this.value > 0)
      this.writeValue(this.value - 1)
  }

  plus() {
    if(this.value < this.max)
      this.writeValue(this.value + 1)
  }
}
