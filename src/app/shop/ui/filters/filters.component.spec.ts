import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockWithValues } from '@testing-library/angular/jest-utils';
import { of } from 'rxjs';
import { toggleFilter } from './../../data-access/store/database/database.action';
import { ShopFacadeService } from './../../data-access/store/shop-facade.service';
import { FiltersComponent } from './filters.component';
import { ProductCategory } from '../../utils/product.interface';
import { provideMockStore } from '@ngrx/store/testing';
import { ButtonComponent } from '../button/button.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let shopFacade: ShopFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent, ButtonComponent],
      providers: [
        provideMockWithValues(ShopFacadeService, {
          filters$: of(new Set([ProductCategory.BAGUETTES])),
          toggleFilter: jest.fn(),
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;

    shopFacade = TestBed.inject(ShopFacadeService);
  });

  it('should render filters', () => {
    fixture.detectChanges();
    let buttons = fixture.debugElement.queryAll(By.css('app-button'));
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should trigger toggleFilter when clicked', () => {
    const toggleFilterSpy = jest.spyOn(shopFacade, 'toggleFilter');
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('app-button'));

    button.triggerEventHandler('click');
    expect(toggleFilterSpy).toHaveBeenCalledTimes(1);
  });

  it('should color activated filter', () => {
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.primary'));

    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent.trim()).toBe(
      ProductCategory.BAGUETTES
    );
  });
});
