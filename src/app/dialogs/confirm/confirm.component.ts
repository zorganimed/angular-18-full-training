import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {DialogService} from "../../service/dialog.service";

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {

  constructor(private dialogService : DialogService) {
  }

  readonly dialogRef = inject(MatDialogRef<ConfirmComponent>);

  onNoClick() {
    this.dialogService.name = "";
    this.dialogRef.close();
  }

  onOkClick() {
    this.dialogService.name = "1";
    this.dialogRef.close();
  }
}
