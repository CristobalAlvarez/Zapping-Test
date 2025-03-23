import { Routes } from '@angular/router';
import { IndexComponent as PlayerIndex } from './player/index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { guardGuard } from './player/guard/guard.guard';

export const routes: Routes = [{
    path: '',
    component: LoginComponent
}, {
    path: 'signup',
    component: SignUpComponent
}, {
    path: 'player',
    canActivate: [guardGuard],
    component: PlayerIndex
}, {
    path: '**',
    redirectTo: ''
}];
