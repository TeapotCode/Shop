import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { fireEvent, screen } from '@testing-library/angular';
import { ProductMock } from '../../utils/product.mock';
import { ButtonComponent } from '../button/button.component';
import { StarsComponent } from '../stars/stars.component';
import { CardComponent } from './card.component';

describe('ButtonComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent, StarsComponent, ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide "add to card" if not in stock', () => {
    const productMock = new ProductMock({ inStock: 0 }).model();
    component._product = productMock;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('app-button'));
    const productNotAvaible = screen.queryByText(/Produkt nie dostępny/i);
    expect(button).toBeNull();

    expect(productNotAvaible).toBeTruthy();
  });

  it('should show button if stock is available', () => {
    const productMock = new ProductMock({ inStock: 10 }).model();
    component._product = productMock;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('app-button'));
    const productNotAvaible = screen.queryByText(/Produkt nie dostępny/i);
    expect(button).toBeTruthy();

    expect(productNotAvaible).toBeNull();
  });

  it('should emit ProductChange on buy click', () => {
    const productMock = new ProductMock({ inStock: 10, max: 10 }).model();
    const buySpy = jest.spyOn(component.onBuy, 'emit');
    const addToCartSpy = jest.spyOn(component, 'addToCartClick');
    component._product = productMock;

    component.count.setValue(3);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button).toBeTruthy();

    fireEvent.click(button.nativeElement);

    expect(addToCartSpy).toHaveBeenCalledTimes(1);
    expect(buySpy).toHaveBeenNthCalledWith(1, {
      product: productMock,
      count: 3,
    });
  });

  it('input should have starting value of 1', () => {
    fixture.detectChanges();
    expect(component.count.value).toBe(1);
  });
});
