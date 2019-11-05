import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskItemModel } from '../models/taskItem.model';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TodoListService {
    public taskItemsChanged = new Subject<TaskItemModel[]>();

    public taskItems: TaskItemModel[] = [];

    constructor(private httpClient: HttpClient) {
        this.httpClient.get<TaskItemModel[]>(`${environment.apiUrl}/api/TaskItems`).subscribe((list) => {
            this.taskItems = list;
            this.taskItemsChanged.next(list);
        });
    }

    public get(taskItemId: number): TaskItemModel {
        return this.taskItems.find(x => x.id === taskItemId);
    }

    public save(taskItem: TaskItemModel): Observable<TaskItemModel> {
        const baseSaveUrl = `${environment.apiUrl}/api/TaskItems`;
        if (taskItem.id) {
            return this.httpClient.put<TaskItemModel>(`${baseSaveUrl}/${taskItem.id}`, taskItem)
                .pipe(tap(updatedtaskItem => {
                    taskItem = updatedtaskItem;
                }));
        } else {
            return this.httpClient.post<TaskItemModel>(`${baseSaveUrl}`, taskItem)
                .pipe(tap(insertedtaskItem => {
                    this.taskItems.push(insertedtaskItem);
                }));
        }
    }

    public delete(taskItemId: number) {
        return this.httpClient.delete<TaskItemModel[]>(`${environment.apiUrl}/api/taskItems/${taskItemId}`).subscribe((list) => {
            const taskItemToRemove = this.get(taskItemId);
            this.taskItems.splice(this.taskItems.indexOf(taskItemToRemove), 1);
        });
    }
}