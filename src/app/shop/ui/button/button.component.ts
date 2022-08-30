import { ChangeDetectorRef, OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

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
export class ButtonComponent implements OnInit {
  @Input() type: 'primary' | 'base' = 'base';

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // if (this.type === 'primary') this.class =

    this.cd.detectChanges();
  }
}
