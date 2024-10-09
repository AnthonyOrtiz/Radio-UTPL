import { Component, OnInit } from '@angular/core';
import { Project } from '../../../shared/interfaces/project.interface';
import { FirestoreService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthServiceService } from '../../../auth/services/auth.service';
import { User } from '../../../shared/interfaces/user.interface';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'radio-project-template',
  templateUrl: './project-template.component.html',
  styleUrl: './project-template.component.css'
})
export class ProjectTemplateComponent implements OnInit{
  public project?:Project;
  safeContent: SafeHtml | null = null;
  liked: boolean = false;
  docId!: string;
  projectLikes: Project = {
    id: '',
    title: '',
    date: Timestamp.now(),
    keywords: '',
    summary: '',
    photo_url: '',
    photo_filename: '',
    content: '',
    likes: 0,
  }
  user: User = {
    uid: '',
    id: '',
    names: '',
    email: '',
    password: '',
    isAdmin: false,
    likedProjects: [],
  }

  constructor(
    private firestoreService:FirestoreService,
    private activatedRouter:ActivatedRoute,
    private router:Router,
    private sanitizer: DomSanitizer,
    private auth: AuthServiceService,
  ){}

  ngOnInit(): void {
    this.activatedRouter.params.pipe(
      switchMap( ({id}) => this.firestoreService.getDocProject<Project>('project',id))
    ).subscribe(project => {

      if (!project) return this.router.navigate(['/radio-utpl/proyectos/']);

      this.project = project;
      this.projectLikes = this.project;
      if (this.project) {
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.project.content || '');
      }
      this.updateLikedStatus()
      return;
    })

    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.docId = res.uid;
        this.getUser()
      }
    });
  }

  toggleLike() {
    // Verifica si el usuario está autenticado
    if (!this.docId) {
      this.router.navigate(['/radio-utpl/auth/login']);
      return;
    }

    if (this.liked) {
      // Quitar like
      this.projectLikes.likes = (this.projectLikes.likes ?? 0) - 1;
  
      this.user.likedProjects = this.user.likedProjects?.filter(
        (projectId) => projectId !== this.projectLikes.id
      );
    } else {
      // Dar like
      this.projectLikes.likes = (this.projectLikes.likes ?? 0) + 1;
      if (!this.user.likedProjects) {
        this.user.likedProjects = [this.projectLikes.id!];
      } else {
        this.user.likedProjects.push(this.projectLikes.id!);
      }
    }
    this.liked = !this.liked;
    this.firestoreService.updateDoc('project',this.projectLikes.id!,this.projectLikes);
    this.firestoreService.updateDoc('user',this.user.uid,this.user);
  } 

  updateLikedStatus() {
    this.liked = this.isLiked() || false;
  }

  isLiked() {
    return this.user.likedProjects?.includes(this.projectLikes.id!);
  }

  getUser(){
    const path = 'user'
    this.firestoreService.getDocProject<User>(path, this.docId).subscribe( res => {
      this.user = {
        uid: res!.uid,
        id: res!.id,
        names: res!.names,
        email: res!.email,
        password: '', 
        isAdmin: res!.isAdmin,
        likedProjects: res!.likedProjects
      };
      this.updateLikedStatus()
    });
  }


}