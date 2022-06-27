import { inject, Injectable } from '@angular/core';
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
     * used to create a new cookie. Name the cookie whatever you want and the data you want it to store.
     * used for login.
     * @param cookieName
     * @param data
     */
    createSession(cookieName: string, data: any) {
        if (cookieName === "userAccount") {
            this.cookieService.set(cookieName, JSON.stringify(data));
            this.userAccount = JSON.parse(this.cookieService.get("userAccount"));
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
     * if user is logged in this will redirect the user to root/homepage.
     */
    sessionActive() {
        this.checkSession = this.checkIfLogged();
        (this.checkSession == true)? this.loggedInDirector() : (this.checkSession === false)? this.loggedOutDirector() : "";
    }

    /**
     * returns a boolean to see if you're logged in.
     * can be used for hiding elements that shouldnt be seen or not via logged in or out.
     */
    checkIfLogged(): boolean {
        return this.cookieService.check("userAccount")
    }

    /**
     * if user logged in redirect user to root/homepage.
     */
    loggedInDirector() {
        (this.checkIfLogged() == true)? this.router.navigateByUrl("") : "";
    }

    /**
     * if user logged out redirect to root/homepage.
     */
    loggedOutDirector() {
        (this.checkIfLogged() === false)? this.router.navigateByUrl("") : "";
    }

    /**
     * checks if cookie exist
     */
    checkCookieExist(cookieName: string): boolean {
        return this.cookieService.check(cookieName);
    }

    redirectThanReload(path: string) {
        this.router.navigate([path]).then(() => {
            window.location.reload();
        });
    }
}
