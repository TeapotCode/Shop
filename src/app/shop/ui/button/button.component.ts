import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.primary]': "type === 'primary'",
    '[class.base]': "type === 'base'",
    role: 'button',
  },
})
export class ButtonComponent {
  @Input() type: 'primary' | 'base' = 'base';
}
