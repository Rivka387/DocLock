import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { User } from '../../types/User';
import { Roles } from '../../types/Roles';

const url = "http://localhost:3000/api";

class UserStore {
    user = {} as User;
    token:string|null = sessionStorage.getItem('token');
    loading:boolean = false;
    error:string | null = null;

    constructor() {
        makeAutoObservable(this);
        
    }

    setSessionStorage(token: string | null) {
        this.token = token;
        if (token) {
            sessionStorage.setItem("token", token); // שמירה לאחר התחברות
            sessionStorage.setItem('userId',this.user.id.toString()); 
            sessionStorage.setItem("loginTime", Date.now().toString());
            this.fetchUser(parseInt(sessionStorage.getItem('userId') as string));
        } else {
          sessionStorage.removeItem("token"); // ניקוי לאחר יציאה
          sessionStorage.removeItem('userId'); 
          sessionStorage.removeItem("loginTime");
        }
      }
    

      logout() {
        this.setSessionStorage(null);
      }


    async fetchUser(userId:number){
        this.loading = true;
        this.error = null;
        try {
            const response = await axios.get(`${url}/User/${userId}`);
            runInAction(() => {
                this.user = response.data;
                this.loading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Failed to load user";
                this.loading = false;
            });
        }
    }


    async registerUser(user:Partial<User>,roles:Roles[]) {
        this.loading = true;
        this.error = null;
        try {
            console.log(JSON.stringify({ user: user, roles: roles }, null, 2));
            const response = await axios.post(`${url}/Auth/register`, {user:user,roles:roles}, {
                headers: { "Content-Type": "application/json" }
            });
            runInAction(() => {
                this.user = response.data.user;
                this.token = response.data.token;
                console.log(this.user,this.token);
                if(this.token){
                    sessionStorage.setItem('token', this.token);
                    sessionStorage.setItem('userId',this.user.id.toString()); 
                    sessionStorage.setItem("loginTime", Date.now().toString());
                }
                const subject = "Welcome to DocLock!";
                const body = `Hello ${user.name},\n\nWelcome to DocLock! Your account has been successfully created.\n\nBest regards,\nDocLock Team`;
                this.sendEmail(user.email!, subject, body);

                this.loading = false;
            });
        } catch (error:any) {
            runInAction(() => {
                this.error = error.message || "Failed to register user";
                this.loading = false;
            });
        }
    }


    async deleteUser(userId:number) {
        this.loading = true;
        this.error = null;
        try {
            await axios.delete(`${url}/User/${userId}`);
            runInAction(() => {
                this.user = {} as User;
                this.token = null;
                this.loading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Failed to delete user";
                this.loading = false;
            });
        }
    }


    async loginUser(email: string, password: string,roles:Roles[]) {
        this.loading = true;
        this.error = null;
        try {
            const response = await axios.post(`${url}/Auth/login`, { email, password ,roles}, {
                headers: { "Content-Type": "application/json" }
            });
            runInAction(() => {
                this.user = response.data.user;
                this.token = response.data.token;
                this.loading = false;
                console.log(response.data.user,response.data.token);
                if(this.token){
                    sessionStorage.setItem('token', this.token);
                    sessionStorage.setItem('userId',this.user.id.toString()); 
                    sessionStorage.setItem("loginTime", Date.now().toString());
                }
            });
        } catch (error : any) {
            runInAction(() => {
                this.error = error.message || "Failed to login";
                this.loading = false;
            });
        }
    }


    async getUserByEmail(email:string) {
        this.loading = true;
        this.error = null;
        try {
            const response = await axios.get(`${url}/User/${email}`);
            runInAction(() => {
                this.user = response.data;
                this.loading = false;
            });
        } catch (error:any) {
            runInAction(() => {
                this.error = error.message || "Failed to get user by email";
                this.loading = false;
            });
        }
    }

    async updateName(id:number, name:string) {
        this.loading = true;
        this.error = null;
        try {
            const response = await axios.put(`${url}/name/${id}`, { name }, {
                headers: { "Content-Type": "application/json" }
            });
            runInAction(() => {
                this.user.name = response.data.name;
                this.loading = false;
            });
        } catch (error:any) {
            runInAction(() => {
                this.error = error.message || "Failed to update name";
                this.loading = false;
            });
        }
    }

    async updatePassword(id:number, password:string) {
        this.loading = true;
        this.error = null;
        try {
            await axios.put(`${url}/password/${id}`, { password }, {
                headers: { "Content-Type": "application/json" }
            });
            runInAction(() => {
                this.loading = false;
            });
        } catch (error:any) {
            runInAction(() => {
                this.error = error.message || "Failed to update password";
                this.loading = false;
            });
        }
    }

    async sendEmail(to:string, subject:string,body:string){
        this.loading = true;
        this.error = null;
        try {
            console.log(to,subject,body);
            
             await axios.post(`${url}/Email/send`, { to, subject, body }, {
                headers: { "Content-Type": "application/json" }
            });
            runInAction(() => {
                this.loading = false;
            });
        } catch (error:any) {
            runInAction(() => {
                this.error = error.message || "Failed to send email";
                this.loading = false;
            });
        }
    }
}

const userStore = new UserStore();
export default userStore;
