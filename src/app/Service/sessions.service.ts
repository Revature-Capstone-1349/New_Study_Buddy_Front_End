import { inject, Injectable, Injector } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { User } from '../Model/user';

@Injectable({
    providedIn: 'root'
})
export class SessionsService {
    userAccount : User = new User();
    checkSession: boolean = false;

    constructor(
        private cookieService: CookieService,
        private router: Router
    ) { }
    
    /**
     * used to create a new cookie. Name the cookie(cookieName) and the data you want it to store(can be any object or data type).
     * used for login.
     * @param cookieName
     * @param data
     */
    createSession(cookieName: string, data: any) {
        if (cookieName === "userAccount") {
            this.cookieService.set(cookieName, JSON.stringify(data));
            this.userAccount = JSON.parse(this.cookieService.get("userAccount"));
        } else {
            this.cookieService.set(cookieName, JSON.stringify(data));
        }
    }

    /**
     * sets any empty stings to undefined
     */
    userAccountNormalizer(data: User): User {
        (data.name === '' || data.name === null)? data.name = undefined : "";
        (data.email === '' || data.email === null)? data.email = undefined : "";
        (data.passwd === '' || data.passwd === null)? data.passwd = undefined : "";
        (data.userId === null)? data.userId = undefined : "";
        return data;
    }

    /**
     * Use to get the parsed content of any cookie and userAccount
     * @param cookieName
     * @returns the parsed content of the cookie
     */
    getSession(cookieName: string): any {
        let c :any;
        (cookieName === 'userAccount')? c = this.userAccountNormalizer(JSON.parse(this.cookieService.get('userAccount'))) 
            : c = JSON.parse(this.cookieService.get(cookieName));
        return c;
        
    }

    logout() {
        this.cookieService.deleteAll();
        this.userAccount = new User();
    }

    /**
     * if user is logged in this.
     * will redirect user to error page if not suppose to land
     */
    pagePreventor() {
        (this.checkIfLogged())? this.redirectThanReload("error") : "";
    }

    /**
     * returns a boolean to see if you're logged in.
     * can be used for hiding elements that shouldnt be seen or not via logged in or out.
     */
    checkIfLogged(): boolean {
        return this.cookieService.check("userAccount")
    }

    /**
     * checks if cookie exist
     */
    checkCookieExist(cookieName: string): boolean {
        return this.cookieService.check(cookieName);
    }

    /**
     * set location you wish to direct with no reload of the page
     * @param path
     */
    redirectNoReload(path: string) {
        this.router.navigate([path]);

    /**
     * set location you wish to direct with reload of the page.
     * used for log in
     * @param path
     */
    }redirectThanReload(path: string) {
        this.router.navigate([path]).then(() => {
            window.location.reload();
        });
    }
}
