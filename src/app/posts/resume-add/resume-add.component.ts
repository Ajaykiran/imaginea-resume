import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { ResumesService } from "../resumes.service";
import { Resume } from "../resume.model";
import { mimeType } from "./mime-type.validator";

@Component({
    selector: "app-resume-add",
    templateUrl: "./resume-add.component.html",
    styleUrls: ["./resume-add.component.css"]
})
export class ResumeAddComponent implements OnInit {
    resume: Resume;
    isLoading = false;
    form: FormGroup;
    filePreview: string;
    private mode = "create";


    constructor(
        public resumesService: ResumesService,
        public route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            file: new FormControl(null, {
                validators: [Validators.required]
                //asyncValidators: [mimeType]
            })
        });

    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({ file: file });
        this.form.get("file").updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.filePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    onSaveResume() {
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === "create") {
            this.resumesService.addSingleResume(
                this.form.value.file
            );
        }
        this.form.reset();
    }

    ngOnDestroy() {
    }
}
