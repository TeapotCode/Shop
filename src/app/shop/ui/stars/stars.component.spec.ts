import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarsComponent } from './stars.component';
describe('StarsComponent', () => {
  let component: StarsComponent;
  let fixture: ComponentFixture<StarsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarsComponent],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(StarsComponent);
    component = fixture.componentInstance;
  });

  describe('setting rating', () => {
    test.each([
      [3, 3],
      [5, 5],
      [0, 0],
      [6, 5],
      [-1, 0],
    ])('for given %i rating should be %i', (input, output) => {
      component.rating = input;
      fixture.detectChanges();

      expect(component._rating).toBe(output);
    });

    it('should color right html input', () => {
      component.rating = 3;
      fixture.detectChanges();

      let inputs = (fixture.nativeElement as HTMLElement).querySelectorAll(
        'input'
      );
      expect(inputs[2].checked).toBeTruthy();
      expect(inputs[3].checked).toBeFalsy();
    });
  });
});
