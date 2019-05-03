import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';

const appRoutes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
