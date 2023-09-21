import { Injectable } from '@angular/core';


const LOGGED_USER = "loggedUser"
const IS_LOGGED = true
const OTP = "otp"
const QUERY_RESPONSE = "query_response"
const QUERY_QUESTION = "query_question"
const UPDATE_USER = "UPDATE_USER_BOOLEAN"
const SAVE_OTP="save_otp"

@Injectable({
  providedIn: 'root'
})
export class SessionService {

constructor() { }

clean(): void {
  window.sessionStorage.clear();
}

public saveLoggedUser(user: any): void {
  window.sessionStorage.removeItem(LOGGED_USER);
  window.sessionStorage.setItem(LOGGED_USER, JSON.stringify(user));
}

public isLogged(isLogged: boolean): void {
  window.sessionStorage.removeItem(LOGGED_USER);
  window.sessionStorage.setItem(LOGGED_USER, JSON.stringify(isLogged));
}

public getLoggedUser(): any {
  const song = window.sessionStorage.getItem(LOGGED_USER);

  if (song) {
    return JSON.parse(song);
  }

  return {};
}

public updateUserProfile(updatedData: any) {
  const existingUserData = this.getLoggedUser();

  // Merge the existing user data with the updatedData
  const updatedUserData = { ...existingUserData, ...updatedData };

  const updatedUserDataString = JSON.stringify(updatedUserData);
  sessionStorage.setItem(LOGGED_USER, updatedUserDataString);
  console.log(updatedUserDataString);
}

}
