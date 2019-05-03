import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CitiesComponent } from './components/cities/cities.component';
import { OfficesComponent } from './components/offices/offices.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards'

const appRoutes: Routes = [
  { path: 'index', component: IndexComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',  canActivate: [AuthGuard], 
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'cities', component: CitiesComponent },
      { path: 'offices', component: OfficesComponent },
      { path: 'users', component:  UsersComponent },
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
