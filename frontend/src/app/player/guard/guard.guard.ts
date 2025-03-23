import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const guardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('TEST_TOKEN');

  if (token) {
    return true;
  }

  router.navigate(['']);
  return false;
};