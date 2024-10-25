import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap  } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { FirestoreService } from '../../../radio/services/firebase.service';
import { Timestamp } from 'firebase/firestore';
import { ResquestLoaderRenderService } from '../../../shared/renders/resquest-loader.service';
import { ConfirmDialogService } from '../../../shared/renders/confirm-dialog.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'admin-card-template',
  templateUrl: './card-template.component.html',
  styleUrl: './card-template.component.css'
})
export class CardTemplateComponent implements OnInit{
  @Input() public userTemplate:boolean = false;
  @Input() public imageSrc:string = '';
  @Input() public title:string = '';
  @Input() public date:string = '';
  @Input() public summary:string = '';
  @Input() public id:string = '';
  @Input() public paramRoute:'podcast' | 'proyecto' | 'mensaje' | 'usuario' |'' = '';
  @Input() public path:'podcast' | 'project' | 'message' | 'user' | '' = '';

  public route:string = '';
  public hasLoaded:boolean = false;
  public isAdmin: boolean = false;

  constructor(
    private router:Router,

    private firestore: FirestoreService,
    private dialog:MatDialog,
    private confirmDialog:ConfirmDialogService,
    private requestLoader:ResquestLoaderRenderService
  ){}

  ngOnInit(): void {
    this.route =  this.paramRoute + '/'+this.id;
    this.firestore.getDocUS<User>('user', this.id).subscribe((user) => {
      console.log('user1',this.id)
      console.log(user)
      if (user) {
        this.isAdmin = user.isAdmin ?? false;
        console.log('user2',this.isAdmin)
      }
    });
  }

  public naviagetToNewElement():void{
    this.router.navigate(['radio-utpl/admin/editar-'+this.route]);
  }

  public onLoad():void{
    this.hasLoaded = true;
  }

  public onDeleteElement():void{
    let request:boolean = false;
    let title:string = '¿Desea eliminar este '+ this.paramRoute + '?' ;
    let description:string = 'Si acepta el proceso será irreversible y se eliminará el '+ this.paramRoute+' de la base de datos.';

    this.confirmDialog.openConfirmDialog(title, description).then((confirmed) => {
      if(confirmed){
        this.firestore.deleteDoc(this.path,this.id)
        let title:string = this.paramRoute.toUpperCase() + ' ELIMINADO';
        let description:string = 'Espere un momento mientras los datos son removidos de la nube.';
        this.requestLoader.initRequestLoader(title,description);
      }
    });

    // dialogRef.afterClosed()
    //   .pipe(
    //     // filter((result:boolean) => result),
    //     // switchMap(() => this.firestoreService.deleteDoc(paramRoute,id)),
    //     // filter((wasDeleted:boolean) => wasDeleted)
    //   )
    //   .subscribe(() => {
    //     console.log('se eejcuto el confirmdialog');
    //     // this.router.navigate(['/heroes']);
    //   });
  }

  public toggleAdmin(event: any): void {
    const isAdmin = event.target.checked; // Capturamos el estado del checkbox.
  
    // Actualizar en la base de datos
    this.firestore.updateDoc('user', this.id, { isAdmin })
      .then(() => {
        console.log('El usuario ha sido actualizado');
      })
      .catch((error) => {
        console.error('Error al actualizar el usuario:', error);
      });
  }
}