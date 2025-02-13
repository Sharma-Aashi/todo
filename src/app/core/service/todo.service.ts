import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable,catchError,throwError} from 'rxjs';
import { Todo } from '../../model/todo.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

interface TodoResponse {
  todos: Todo[];
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<TodoResponse>(`${this.apiUrl}`).pipe(
      map((todos) => todos.todos),
      catchError((error) => {
        console.error('Error fetching todos:', error);
        return throwError(
          () => new Error('Failed to fetch todos. Please try again.')
        );
      })
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    const payLoad = { ...todo, userId: 5 };
    return this.http.post<Todo>(`${this.apiUrl}/add`, payLoad);
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTodo(todo: Todo) {
    const payLoad = { completed: todo.completed };
    return this.http.put(`${this.apiUrl}/${todo.id}`, payLoad);
  }
}
