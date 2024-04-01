import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Person } from "../../interface/person";
// parent-component.ts
// edit-person.component.ts
@Component({
  selector: "edit-person",
  templateUrl: "./edit-person.component.html",
  styleUrls: ["./edit-person.component.css"],
})
export class EditPersonComponent {
  @Input() person: Person;
  @Output() save: EventEmitter<Person> = new EventEmitter<Person>();
  @Output() cancel: EventEmitter<number> = new EventEmitter<number>();

  saveChanges(): void {
    // Implement save logic
    this.save.emit(this.person);
  }

  cancelEdit(): void {
    // Implement cancel logic
    this.cancel.emit(this.person.id);
  }
}
