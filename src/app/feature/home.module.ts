import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [TodoListComponent, TodoFormComponent, TodoItemComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class HomeModule {}
