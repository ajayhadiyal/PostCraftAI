import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PostService } from "../../services/post.service";
import { Post } from "../../models/post.model";

@Component({
  selector: "app-post-generator",
  templateUrl: "./post-generator.component.html",
  styleUrls: ["./post-generator.component.css"],
  standalone: false,
})
export class PostGeneratorComponent implements OnInit {
  promptForm: FormGroup;
  isGenerating: boolean = false;
  isPublishing: boolean = false;
  isSaving: boolean = false;
  generatedContent: string = "";
  showPreview: boolean = false;
  error: string | null = null;
  showTipsModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    this.promptForm = this.fb.group({
      prompt: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.showTipsModal = true;    
    setTimeout(() => {
      const modalContent = document.querySelector(".modal-content");
      if (modalContent) {
        modalContent.classList.add("active");
      }
    }, 10);
  }

  generatePost(): void {
    if (this.promptForm.invalid) {
      return;
    }

    const prompt = this.promptForm.get("prompt")?.value;
    this.isGenerating = true;
    this.error = null;

    this.postService.generatePost(prompt).subscribe({
      next: (content) => {
        this.generatedContent = content;
        this.showPreview = true;
        this.isGenerating = false;
      },
      error: (err) => {
        console.error("Error generating post:", err);
        this.error = "Failed to generate post. Please try again.";
        this.isGenerating = false;
      },
    });
  }

  saveAsDraft(): void {
    if (!this.generatedContent) {
      return;
    }

    this.isSaving = true;

    const post: Post = {
      content: this.generatedContent,
      prompt: this.promptForm.get("prompt")?.value,
      isPublished: false,
    };

    this.postService.saveDraft(post).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        console.error("Error saving draft:", err);
        this.error = "Failed to save draft. Please try again.";
        this.isSaving = false;
      },
    });
  }

  publishPost(): void {
    if (!this.generatedContent) {
      return;
    }

    this.isPublishing = true;

    const post: Post = {
      content: this.generatedContent,
      prompt: this.promptForm.get("prompt")?.value,
    };

    this.postService.publishToLinkedIn(post).subscribe({
      next: () => {
        this.isPublishing = false;
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        console.error("Error publishing post:", err);
        this.error = "Failed to publish post. Please try again.";
        this.isPublishing = false;
      },
    });
  }

  updateContent(content: string): void {
    this.generatedContent = content;
  }

  backToPrompt(): void {
    this.showPreview = false;
  }

  closeTipsModal(): void {
    const modalContent = document.querySelector(".modal-content");
    if (modalContent) {
      modalContent.classList.remove("active");
      setTimeout(() => {
        this.showTipsModal = false;
      }, 300); // Delay to allow animation to complete
    }
  }
   adjustTextareaHeight(event: KeyboardEvent): void {
    const textarea = event.target as HTMLTextAreaElement;
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault(); // Prevent new line if desired
      textarea.rows = textarea.rows + 2; // Increase height by 2 rows
    }
    // Auto-adjust height based on content
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
