import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoListService } from 'src/app/services/todolist.service';
import { BehaviorSubject } from 'rxjs';
import { TaskItemModel } from 'src/app/models/taskitem.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html'
})
export class TodoUpdateComponent implements OnInit, OnDestroy {
  public editForm: FormGroup;
  public idToEdit = new BehaviorSubject<number>(null);
  public editItem: TaskItemModel;

  constructor(public activeModal: NgbActiveModal, private todoListService: TodoListService) { }

  ngOnInit() {
    this.initEditForm();

    this.idToEdit.subscribe((id: number) => {
      if (id) {
        this.editItem = this.todoListService.get(id);
        this.editForm.setValue({
          'title': this.editItem.title,
          'description': this.editItem.description,
          'isCompleted': this.editItem.isCompleted
        });
      } else {
        this.editItem = new TaskItemModel();
        this.editForm.reset();
      }
    });
  }

  ngOnDestroy(): void {
    this.idToEdit.unsubscribe();
  }

  private initEditForm(): void {
    this.editForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'isCompleted': new FormControl(null, [Validators.required])
    });
  }

  public onSave(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.editItem.title = this.editForm.value.title;
    this.editItem.description = this.editForm.value.description;
    this.editItem.isCompleted = this.editForm.value.isCompleted;

    this.todoListService.save(this.editItem).subscribe(() => {
      this.editForm.reset();
      this.activeModal.close();
    });
  }
}
