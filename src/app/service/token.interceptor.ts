import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let _token = '';
  let jwt = req.clone({
    setHeaders:{
      Authorization : `bearer `+_token
    }
  })
  return next(jwt);
};
