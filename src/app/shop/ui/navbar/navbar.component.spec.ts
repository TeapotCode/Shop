import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should show badge if items greater than 0', () => {
    component.cardItems = 3;
    fixture.detectChanges();

    const span = fixture.nativeElement.querySelector('span') as HTMLSpanElement;

    expect(span).toBeDefined();
    expect(span).not.toBeNull();
    expect(span.innerHTML).toBe('3');
  });

  it('should NOT show badge if items greater than 0', () => {
    component.cardItems = 0;
    fixture.detectChanges();

    const span = fixture.nativeElement.querySelector('span') as HTMLSpanElement;

    expect(span).toBeNull();
  });

  it('should emit output on cart click', () => {
    const emitSpy = jest.spyOn(component.cartClick, 'emit');

    let cartButton = fixture.debugElement.query(By.css('label'));
    cartButton.triggerEventHandler('click');
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });
});
