import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home';
import {AuthGuard} from './_helpers';
import {ProfileComponent} from '@app/profile/profile.component';
import {InsideBookComponent} from "@app/inside-book/inside-book.component";
import {ChangePasswordComponent} from "@app/users/change-password.component";

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const booksModule = () => import('./books/books.module').then(x => x.BooksModule);

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'users', loadChildren: usersModule, canActivate: [AuthGuard]},
  {path: 'account', loadChildren: accountModule},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'books', children: [
      {
        path: '', loadChildren: booksModule, canActivate: [AuthGuard]
      },
      {
        path: ':id', component: InsideBookComponent
      }
    ]},
  {path: 'auth/password/:id', component: ChangePasswordComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
