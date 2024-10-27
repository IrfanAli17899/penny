import { Route } from '@angular/router';
import {
    LoginPageComponent,
    DashboardPageComponent,
    ForgetPageComponent,
    RegisterPageComponent,
    TodosPageComponent,
    HomePageComponent,
    ResetPageComponent,
    NotFoundPageComponent
} from './pages';
import { AuthLayoutComponent, DashboardLayoutComponent } from './layouts';
import { PrivateGuard, PublicGuard } from './guards';

export const appRoutes: Route[] = [
    {
        path: "",
        component: HomePageComponent,
    },
    {
        path: "auth",
        component: AuthLayoutComponent,
        canActivate: [PublicGuard],
        children: [
            { path: "login", component: LoginPageComponent },
            { path: "register", component: RegisterPageComponent },
            { path: "forget", component: ForgetPageComponent },
            { path: "reset", component: ResetPageComponent }
        ]
    },
    {
        path: "dashboard",
        component: DashboardLayoutComponent,
        canActivate: [PrivateGuard],
        children: [
            { path: "", component: DashboardPageComponent },
            { path: "todos", component: TodosPageComponent }
        ]
    },
    { path: "**", component: NotFoundPageComponent }
];
