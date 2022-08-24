import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      (await import('./shop/feature/shell/shell.module')).ShellModule,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

import { NgModule } from '@angular/core';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
