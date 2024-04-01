import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PersonListComponent } from "./components/person-list/person-list.component";
import { PersonItemComponent } from "./components/person-item/person-item.component";
import { EditPersonComponent } from "./components/edit-person/edit-person.component";

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonItemComponent,
    EditPersonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
