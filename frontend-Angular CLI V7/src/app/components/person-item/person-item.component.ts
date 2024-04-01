import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Person } from "../../interface/person";

@Component({
  selector: "person-item",
  templateUrl: "./person-item.component.html",
  styleUrls: ["./person-item.component.css"],
})
export class PersonItemComponent {
  @Input() person: Person;
  @Output() edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  // store changes to person object

  constructor() {}

  // Emit edit event with person id
  editPerson(): void {
    this.edit.emit(this.person.id);
  }

  // Emit delete event with person id
  deletePerson(): void {
    this.delete.emit(this.person.id);
  }
}
