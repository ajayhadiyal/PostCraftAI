import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css'],
  standalone: false
})
export class PostPreviewComponent implements OnChanges {
  @Input() content: string = '';
  @Input() prompt: string = '';
  @Output() contentChanged = new EventEmitter<string>();
  
  editableContent: string = '';
  isEditing: boolean = false;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      this.editableContent = this.content;
    }
  }
  
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    
    // If we're exiting edit mode, emit the updated content
    if (!this.isEditing) {
      this.contentChanged.emit(this.editableContent);
    }
  }
  
  handleContentChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.editableContent = target.value;
  }
  
  regeneratePost(): void {
    // In a real app, this would call the service to regenerate
    // For now, we'll just toggle edit mode
    this.toggleEdit();
  }
  
  getCharacterCount(): number {
    return this.editableContent.length;
  }
}