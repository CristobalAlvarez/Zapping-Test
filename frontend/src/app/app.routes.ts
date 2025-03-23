import { Routes } from '@angular/router';
import { IndexComponent as PlayerIndex } from './player/index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

export const routes: Routes = [{
    path: '',
    component: LoginComponent
}, {
    path: 'signup',
    component: SignUpComponent
}, {
    path: 'player',
    component: PlayerIndex
}, {
    path: '**',
    redirectTo: ''
}];
