/*

If you are not able to attach the zip files, please upload it to google drive and send the google drive link by mail.

(a) Angular7/8 test

1. Design a small Single Page Application(in Angular 7/8 ) to manage a list of people.

Create at least 3 views:

>>list all people

>> edit a person

>>delete a person

**Person collection fields: Name, Age, Gender, Mobile number
*/

import { Injectable } from "@angular/core";
import { Person } from "../interface/person";
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError as observableThrowError } from "rxjs";
import { EditPersonSchema } from "../interface/edit";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class PersonService {
  persons: Person[] = [];
  editPersons: EditPersonSchema[] = [];

  constructor(private http: HttpClient) {}
  async getPersonList(): Promise<Person[]> {
    try {
      const response = await this.http.get(API_URL + "/person").toPromise();
      this.persons = response as Person[];
      this.editPersons = this.persons.map((person) => {
        return { id: person.id, edit: false };
      });
      return this.persons;
    } catch (error) {
      this.errorHandler(error);
      return []; // Return an empty array in case of error
    }
  }
  errorHandler(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return observableThrowError(errorMessage);
  }
  getPerson(id: number): Person {
    return this.persons.find((person) => person.id === id);
  }
  async createPerson(person: Person): Promise<void> {
    try {
      const response = await this.http
        .post(API_URL + "/person", person)
        .toPromise();
      this.persons.push(response as Person);
      this.editPersons.push({ id: (response as Person).id, edit: false });
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async updatePerson(person: Person): Promise<void> {
    try {
      const response = await this.http
        .put(API_URL + "/person/" + person.id, person)
        .toPromise();
      const index = this.persons.findIndex((p) => p.id === person.id);
      this.persons[index] = response as Person;
      const editIndex = this.editPersons.findIndex((p) => p.id === person.id);
      this.editPersons[editIndex].edit = false;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async deletePerson(id: number): Promise<void> {
    try {
      await this.http.delete(API_URL + "/person/" + id).toPromise();
      this.persons = this.persons.filter((person) => person.id !== id);
    } catch (error) {
      this.errorHandler(error);
    }
  }
  editPerson(id: number): void {
    const index = this.editPersons.findIndex((person) => person.id === id);
    this.editPersons[index].edit = true;
  }
  cancelEdit(id: number): void {
    const index = this.editPersons.findIndex((person) => person.id === id);
    this.editPersons[index].edit = false;
  }
  getEditPerson(id: number): boolean {
    const index = this.editPersons.findIndex((person) => person.id === id);
    return this.editPersons[index].edit;
  }
}
