import {
    BehaviorSubject
} from 'rxjs';

export const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
export const authenticationService = {
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    }
};