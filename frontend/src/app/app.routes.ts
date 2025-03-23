import { Routes } from '@angular/router';
import { IndexComponent as PlayerIndex } from './player/index/index.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [{
    path: 'login',
    component: LoginComponent
}, {
    path: 'player',
    component: PlayerIndex
}, {
    path: '**',
    redirectTo: 'player'
}];
