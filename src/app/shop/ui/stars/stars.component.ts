import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {

  _rating: number = 0;
  stars = 5

  @Input()
  set rating(value: number) {
    this._rating = Math.min(this.stars, Math.max(0, value))
  }
}
