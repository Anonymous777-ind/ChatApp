import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BackendApiService } from './backend-api.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(BackendApiService);
  const router = inject(Router);
  
  if(auth.isAuthenticated()){
    return true;
  }else{
    router.navigate(['login'])
    return false;
  }
};
