import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    DeleteConfirmationDialogComponent
  ],
  imports: [
    CommonModule,RouterModule,MatDialogModule,MatButtonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    DeleteConfirmationDialogComponent
  ]
})
export class SharedModule { }
