import { Component,OnInit } from '@angular/core';
import { TodoService } from '../../core/service/todo.service';
import { Todo } from '../../model/todo.model';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  todos: Todo[] = [];
  pendingTodos: Todo[] = [];
  completedTodos: Todo[] = [];
  draggedTodo: any;

  constructor(private todoService: TodoService,public dialog: MatDialog) {}

  ngOnInit() {
    this.todoService.getTodos().pipe(takeUntil(this.unsubscribe$)).subscribe((todos) => {
      this.todos = todos;
      this.pendingTodos = this.todos.filter((todo) => !todo.completed);
      this.completedTodos = this.todos.filter((todo) => todo.completed);
    });
  }

    // When dragging starts
    onDragStart(event: DragEvent, todo: any) {
      this.draggedTodo = todo;
      event.dataTransfer?.setData("text/plain", JSON.stringify(todo));
    }
  
    // Allow drag over
    allowDrop(event: DragEvent) {
      event.preventDefault();
    }
  
    // On drop, move todo between lanes
    onDrop(event: DragEvent, completed: boolean) {
      event.preventDefault();
  
      // Find dragged item
      const todo = this.draggedTodo;
  
      if (!todo) return;
  
      // Remove from original list
      if (todo.completed) {
        this.completedTodos = this.completedTodos.filter(t => t.id !== todo.id);
      } else {
        this.pendingTodos = this.pendingTodos.filter(t => t.id !== todo.id);
      }
  
      // Update completion status & move to new list
      todo.completed = completed;
      if (completed) {
        this.completedTodos.push(todo);
      } else {
        this.pendingTodos.push(todo);
      }
  
      this.draggedTodo = null;
    }

    openAddDialog() {
      const dialogRef = this.dialog.open(TodoFormComponent, {
        width: '400px',
        data: null
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addTodo(result);
        }
      });
    }

    addTodo(todo: Todo) {
      this.todoService.addTodo(todo).pipe(takeUntil(this.unsubscribe$)).subscribe((newTodo) => {
        this.todos.push(newTodo);
        if (newTodo.completed) {
          this.completedTodos.push(newTodo);
        } else {
          this.pendingTodos.push(newTodo);
        }
      });
    }

    handleUpdate(todo: Todo) {
      this.todoService.updateTodo(todo).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        const index = this.todos.findIndex(t => t.id === todo.id);
        this.todos[index] = todo;
        if (todo.completed) {
          this.completedTodos = [...this.completedTodos, todo];
          this.pendingTodos = this.pendingTodos.filter(t => t.id !== todo.id);
        } else {
          this.pendingTodos = [...this.pendingTodos, todo];
          this.completedTodos = this.completedTodos.filter(t => t.id !== todo.id);
        }
    });
  }

    handleDelete(todo: Todo) {
      this.todoService.deleteTodo(todo.id).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== todo.id);
        this.pendingTodos = this.pendingTodos.filter(t => t.id !== todo.id);
        this.completedTodos = this.completedTodos.filter(t => t.id !== todo.id);
      });
    }

    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
}
