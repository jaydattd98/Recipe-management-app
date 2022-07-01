import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("In intercepter..!!");
        console.log(req);
        const modifiedReq=req.clone({
            headers:req.headers.append('auth',"key")
        })
        return next.handle(modifiedReq);
    }

    
}
