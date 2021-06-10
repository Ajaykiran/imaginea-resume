import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { ResumeEditComponent } from "./resume-edit/resume-edit.component";
import { ResumeListComponent } from "./resume-list/resume-list.component";
import { AngularMaterialModule } from "../angular-material.module";
import { ResumeAddComponent } from "./resume-add/resume-add.component";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [ResumeEditComponent, ResumeListComponent, ResumeAddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class ResumesModule { }