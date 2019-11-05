import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoListService } from 'src/app/services/todolist.service';
import { TaskItemModel } from 'src/app/models/taskitem.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoUpdateComponent } from '../todo-update/todo-update.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit, OnDestroy {
  public editItem: TaskItemModel;
  private taskItemsChanged: Subscription;
  public taskItems: TaskItemModel[] = [];

  constructor(private todoListService: TodoListService, private modalService: NgbModal) { }

  ngOnInit() {
    this.taskItems = this.todoListService.taskItems;

    this.taskItemsChanged = this.todoListService.taskItemsChanged.subscribe((taskItems) => {
      this.taskItems = taskItems;
    });
  }

  ngOnDestroy(): void {
    this.taskItemsChanged.unsubscribe();
  }

  public onEdit(todoItemId: number): void {
    this.openEditPopup(todoItemId);
  }

  public onAdd(): void {
    this.openEditPopup(null);
  }

  public onDelete(todoItemId: number): void {
    this.todoListService.delete(todoItemId);
  }
public setComplete(taskItemId: number): void {
  this.editItem = new TaskItemModel();
  this.editItem = this.todoListService.get(taskItemId);
  this.editItem.isCompleted = !this.editItem.isCompleted;
    this.todoListService.save(this.editItem);
  }
  private openEditPopup(todoItemId: number) {
    const modalRef = this.modalService.open(TodoUpdateComponent);
    const component = <TodoUpdateComponent>modalRef.componentInstance;
    component.idToEdit.next(todoItemId);
  }
}
