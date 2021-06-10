import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResumeListComponent } from "./posts/resume-list/resume-list.component";
import { ResumeEditComponent } from "./posts/resume-edit/resume-edit.component";
import { ResumeAddComponent } from "./posts/resume-add/resume-add.component";

const routes: Routes = [
  { path: "", component: ResumeListComponent },
  { path: "add", component: ResumeAddComponent },
  { path: "create", component: ResumeEditComponent },
  { path: "edit/:postId", component: ResumeEditComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }