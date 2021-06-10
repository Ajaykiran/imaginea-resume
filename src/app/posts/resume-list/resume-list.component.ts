import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";

import { Resume } from "../resume.model";
import { ResumesService } from "../resumes.service";

@Component({
  selector: "app-resume-list",
  templateUrl: "./resume-list.component.html",
  styleUrls: ["./resume-list.component.css"]
})
export class ResumeListComponent implements OnInit, OnDestroy {
  term = '';
  posts: Resume[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription;
  post: Resume;

  constructor(
    public resumesService: ResumesService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.resumesService.getResumes(this.postsPerPage, this.currentPage);
    this.postsSub = this.resumesService
      .getResumeUpdateListener()
      .subscribe((postData: { posts: Resume[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }

  ngAfterViewInit() { }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.resumesService.getResumes(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.resumesService.deleteResume(postId).subscribe(() => {
      this.resumesService.getResumes(this.postsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  onDownload(postId: string) {
    this.isLoading = true;
    this.resumesService.getResume(postId).subscribe((postData) => {
      this.post = {
        id: postData._id,
        filename: postData.filename,
        name: postData.name,
        email: postData.email,
        phonenumber: postData.phonenumber,
        linkedin: postData.linkedin,
        education: postData.education,
        skills: postData.skills,
        languages: postData.languages,
        filePath: postData.filePath
      };
      this.isLoading = false;
      console.log(this.post.filePath);
      window.open(this.post.filePath)
    });

  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
