import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('adminToken');
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } });
  }
  return next(req);
};
