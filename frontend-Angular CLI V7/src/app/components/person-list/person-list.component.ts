import { Component, OnInit } from "@angular/core";
import { PersonService } from "../../services/person.service";
import { Person } from "src/app/interface/person";

@Component({
  selector: "person-list",
  templateUrl: "./person-list.component.html",
  styleUrls: ["./person-list.component.css"],
  providers: [PersonService],
})
export class PersonListComponent implements OnInit {
  person: Person;
  name: string;
  age: number;
  mobile: number;
  gender: string = "preferNotToSay";
  constructor(public personService: PersonService) {}
  onSubmit(): void {
    this.personService.createPerson({
      id: this.personService.persons.length + 1,
      name: this.name,
      age: this.age,
      gender: this.gender,
      mobile: this.mobile,
    });

    // Reset form fields
    this.name = "";
    this.age = null;
    this.gender = "preferNotToSay";
    this.mobile = null;
  }

  async ngOnInit() {
    await this.personService.getPersonList();
  }
  cancelEdit(id: number): void {
    this.personService.cancelEdit(id);
  }
}
