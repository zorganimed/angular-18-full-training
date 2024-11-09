import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {MasterService} from "../service/master.service";

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let masterService = inject(MasterService);

//   if (route.url.length > 0) {
//     let menu = route.url[0].path;
//   if (menu === 'about') {
//     alert('you don t have access');
//     router.navigate(['customer']);
//     //router.navigateByUrl('/customer');
//     return false;
//   } else {
//     console.log(menu);
//     return true;
//   }
// }else {
//     return true;
//   }

  if(masterService.isLoggedIn()){
    return true;
  }else{
    //alert('Unauthorized access');
    router.navigateByUrl('/login');
    return false;
  }
};
