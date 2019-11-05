import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { TodoListService } from './services/todolist.service';
import { TodoUpdateComponent } from './components/todo/todo-update/todo-update.component';
import { ErrorInterceptor } from './services/error.interceptor';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TodoListComponent,
    TodoUpdateComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
      NgbModule,
      FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'todo', component: TodoListComponent },
    ])
  ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        TodoListService],
    entryComponents: [TodoUpdateComponent, ErrorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
