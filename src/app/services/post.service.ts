import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];

  constructor(private http: HttpClient) {}

  // Generate post content using AI (simulated)
  generatePost(prompt: string): Observable<string> {
    // In a real app, this would call an AI API
    // For demo purposes, we'll simulate an AI response
    
    const response = this.simulateAIResponse(prompt);
    
    // Simulate API delay
    return of(response).pipe(delay(1500));
  }

  // Publish post to LinkedIn (simulated)
  publishToLinkedIn(post: Post): Observable<Post> {
    // In a real app, this would use LinkedIn API
    // For demo purposes, we'll simulate a successful post
    
    const publishedPost: Post = {
      ...post,
      id: this.generateId(),
      isPublished: true,
      publishedAt: new Date()
    };
    
    this.posts.push(publishedPost);
    
    // Simulate API delay
    return of(publishedPost).pipe(delay(1000));
  }

  // Save draft post
  saveDraft(post: Post): Observable<Post> {
    const draftPost: Post = {
      ...post,
      id: post.id || this.generateId(),
      isPublished: false,
      createdAt: new Date()
    };
    
    const existingIndex = this.posts.findIndex(p => p.id === draftPost.id);
    
    if (existingIndex >= 0) {
      this.posts[existingIndex] = draftPost;
    } else {
      this.posts.push(draftPost);
    }
    
    return of(draftPost);
  }

  // Get user's posts
  getUserPosts(): Observable<Post[]> {
    return of(this.posts);
  }

  // Simulate AI response based on prompt
  private simulateAIResponse(prompt: string): string {
    // Very simple simulation - in a real app, this would use an actual AI service
    const responses = [
      `📈 Exciting news! I've been working on ${prompt} and the results have been incredible. This approach has transformed how we think about business development. #Innovation #Leadership`,
      
      `I'm thrilled to share my thoughts on ${prompt}. After years in the industry, I've found that the key to success is focusing on value creation and authentic relationships. What's your experience been? #ProfessionalDevelopment`,
      
      `Today marks an important milestone in my journey with ${prompt}. I've learned that persistence and adaptability are crucial for growth in any industry. Would love to hear your insights! #CareerGrowth #Networking`,
      
      `🚀 Just published a new article about ${prompt}! In it, I share 5 key strategies that helped our team achieve remarkable results this quarter. Check it out in the comments! #ThoughtLeadership #GrowthMindset`
    ];
    
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}