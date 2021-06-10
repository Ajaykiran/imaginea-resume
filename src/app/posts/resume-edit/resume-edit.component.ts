import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { ResumesService } from "../resumes.service";
import { Resume } from "../resume.model";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-resume-edit",
  templateUrl: "./resume-edit.component.html",
  styleUrls: ["./resume-edit.component.css"]
})
export class ResumeEditComponent implements OnInit, OnDestroy {
  resume: Resume;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private resumeId: string;

  constructor(
    public resumesService: ResumesService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      filename: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      name: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      phonenumber: new FormControl(null, { validators: [Validators.required] }),
      linkedin: new FormControl(null, { validators: [Validators.required] }),
      education: new FormControl(null, { validators: [Validators.required] }),
      skills: new FormControl(null, { validators: [Validators.required] }),
      languages: new FormControl(null, { validators: [Validators.required] }),
      file: new FormControl(null, {
        validators: [Validators.required]
        // asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.resumeId = paramMap.get("postId");
        this.isLoading = true;
        this.resumesService.getResume(this.resumeId).subscribe(resumeData => {
          this.isLoading = false;
          this.resume = {
            id: resumeData._id,
            filename: resumeData.filename,
            name: resumeData.name,
            email: resumeData.email,
            phonenumber: resumeData.phonenumber,
            linkedin: resumeData.linkedin,
            education: resumeData.education,
            skills: resumeData.skills,
            languages: resumeData.languages,
            filePath: resumeData.filePath
          };
          this.form.setValue({
            filename: this.resume.filename,
            name: this.resume.name,
            email: this.resume.email,
            phonenumber: this.resume.phonenumber,
            linkedin: this.resume.linkedin,
            education: this.resume.education,
            skills: this.resume.skills,
            languages: this.resume.languages,
            file: this.resume.filePath
          });
        })
      } else {
        this.mode = "create";
        this.resumeId = null;
      }
    });

  }

  // onFilePicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({ file: file });
  //   this.form.get("file").updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.resumesService.addResume(
        this.form.value.filename,
        this.form.value.name,
        this.form.value.email,
        this.form.value.phonenumber,
        this.form.value.linkedin,
        this.form.value.education,
        this.form.value.skills,
        this.form.value.languages,
        this.form.value.file
      );
    } else {
      this.resumesService.updateResume(
        this.resumeId,
        this.form.value.filename,
        this.form.value.name,
        this.form.value.email,
        this.form.value.phonenumber,
        this.form.value.linkedin,
        this.form.value.education,
        this.form.value.skills,
        this.form.value.languages,
        this.form.value.file
      );
    }
    this.form.reset();
  }

  ngOnDestroy() {
  }
}
