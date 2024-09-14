import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  constructor() { }
  private personalDetails: { emailAddress: string; firstName: string; lastName: string } = {
    emailAddress: '',
    firstName: '',
    lastName: '',
  };
  setPersonalDetails(details: { emailAddress: string; firstName: string; lastName: string }) {
    this.personalDetails = details;
  }
  getPersonalDetails() {
    return this.personalDetails;
  }
}
