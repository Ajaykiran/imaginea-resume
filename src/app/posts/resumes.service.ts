
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { Resume } from "./resume.model";

const BACKEND_URL = environment.apiUrl + "/resumes/";
const RESUME_BACKEND_URL = environment.apiUrl + "/singleUpload/";

@Injectable({ providedIn: "root" })
export class ResumesService {
  private Resumes: Resume[] = [];
  private resumesUpdated = new Subject<{ posts: Resume[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getResumes(resumesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${resumesPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxResumes: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(postData => {
          return {
            Resumes: postData.posts.map(post => {
              return {
                filename: post.filename,
                name: post.name,
                email: post.email,
                phonenumber: post.phonenumber,
                linkedin: post.linkedin,
                education: post.education,
                skills: post.skills,
                languages: post.languages,
                id: post._id,
                filepath: post.filepath
              };
              // console.log(post.category);
            }),
            maxResumes: postData.maxResumes
          };
        })
      )
      .subscribe(transformedResumeData => {
        this.Resumes = transformedResumeData.Resumes;
        this.resumesUpdated.next({
          posts: [...this.Resumes],
          postCount: transformedResumeData.maxResumes
        });
      });
  }

  getResumeUpdateListener() {
    return this.resumesUpdated.asObservable();
  }

  getResume(id: string) {
    return this.http.get<{
      _id: string;
      filename: string;
      name: string;
      email: string;
      phonenumber: string;
      linkedin: string;
      education: string;
      skills: string,
      languages: string,
      filePath: string;
    }>(BACKEND_URL + id);
  }

  addResume(filename: string, name: string, email: string, phonenumber: string, linkedin: string, education: string, skills: string, languages: string, file: File) {
    const resumeData = new FormData();
    resumeData.append("filename", filename);
    resumeData.append("name", name);
    resumeData.append("email", email);
    resumeData.append("phonenumber", phonenumber);
    resumeData.append("linkedin", linkedin);
    resumeData.append("education", education);
    resumeData.append("skills", skills);
    resumeData.append("languages", languages);
    resumeData.append("file", file, filename);
    this.http
      .post<{ message: string; post: Resume }>(
        BACKEND_URL,
        resumeData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  addSingleResume(file: File) {
    const resumeData = new FormData();
    resumeData.append("file", file);
    this.http
      .post<{ message: string; post: Resume }>(
        RESUME_BACKEND_URL,
        resumeData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updateResume(id: string, filename: string, name: string, email: string, phonenumber: string, linkedin: string, education: string, skills: string, languages: string, file: File | string) {
    let resumeData: Resume | FormData;
    if (typeof file === "object") {
      resumeData = new FormData();
      resumeData.append("id", id);
      resumeData.append("filename", filename);
      resumeData.append("name", name);
      resumeData.append("email", email);
      resumeData.append("phonenumber", phonenumber);
      resumeData.append("linkedin", linkedin);
      resumeData.append("education", education);
      resumeData.append("skills", skills);
      resumeData.append("languages", languages);
      resumeData.append("file", file, filename);
    } else {
      resumeData = {
        id: id,
        filename: filename,
        name: name,
        email: email,
        phonenumber: phonenumber,
        linkedin: linkedin,
        education: education,
        skills: skills,
        languages: languages,
        filePath: file
      };
    }
    this.http
      .put(BACKEND_URL + id, resumeData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteResume(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }
}
