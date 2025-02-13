import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Todo } from '../../model/todo.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todo-item',
  standalone: false,
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() deleteTodoEvent = new EventEmitter<Todo>();
  @Output() updateTodoEvent = new EventEmitter<Todo>();
  @Output() dragStarted = new EventEmitter<Todo>();

  constructor(public dialog: MatDialog) {}
  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTodoEvent.emit(this.todo);
      }
    });
  }

  openUpdateDialog(todo: Todo) {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '400px',
      data: todo // Pass the selected todo for editing
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTodoEvent.emit(todo);
      }
    });
  }

}
