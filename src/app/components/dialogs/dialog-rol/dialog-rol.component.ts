import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/service/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-rol',
  templateUrl: './dialog-rol.component.html',
  styleUrls: ['./dialog-rol.component.css']
})
export class DialogRolComponent implements OnInit {

  public dialogForm: FormGroup;

  constructor(private appService: AppService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogRolComponent>) { }

  ngOnInit(): void {    
    this.dialogForm = this.formBuilder.group({
      rol: ['', Validators.required]
    });

  }

  inRol() {
    this.dialogRef.close(this.dialogForm.value.rol);
  }
}
