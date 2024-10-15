import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const isLoginRequest = req.url.includes('/auth/authenticate');

  if (!isLoginRequest) {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(clonedReq);
    }
  }

  return next(req);
};
