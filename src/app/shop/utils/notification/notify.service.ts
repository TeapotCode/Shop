import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  OnDestroy,
} from '@angular/core';
import {
  NotificationComponent,
  NotificationType,
} from './ui/notification.component';
import { DOCUMENT } from '@angular/common';
import {
  ComponentPortal,
  ComponentType,
  DomPortalOutlet,
} from '@angular/cdk/portal';
import { NotifyWrapperComponent } from './ui/notify-wrapper.component';

@Injectable({
  providedIn: 'root',
})
export class NotifyService implements OnDestroy {
  private notifyComp: ComponentRef<NotifyWrapperComponent> | undefined;
  private comp: ComponentRef<NotificationComponent> | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private factory: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  private createInPlace<T>(element: Element, component: ComponentType<T>) {
    return new DomPortalOutlet(
      element,
      this.factory,
      this.appRef,
      this.injector
    ).attach(new ComponentPortal(component));
  }

  timeoutRef: ReturnType<typeof setTimeout> | undefined;

  notify(
    message: string,
    type: NotificationType = 'success',
    duration: number = 5000
  ) {
    if (!this.notifyComp)
      this.notifyComp = this.createInPlace(
        this.document.body,
        NotifyWrapperComponent
      );

    this.comp && this.comp.destroy();

    this.comp = this.createInPlace(
      this.notifyComp.location.nativeElement,
      NotificationComponent
    );

    this.comp.setInput('type', type);
    this.comp.setInput('message', message);

    clearTimeout(this.timeoutRef);
    this.timeoutRef = setTimeout(() => {
      this.comp && this.comp.destroy();
    }, duration);
  }

  ngOnDestroy(): void {
    this.notifyComp && this.notifyComp.destroy();
  }
}
