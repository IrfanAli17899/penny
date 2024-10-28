import { Route } from '@angular/router';
import {
    LoginPageComponent,
    ForgetPageComponent,
    RegisterPageComponent,
    ResetPageComponent,
    NotFoundPageComponent,
    TodosPageComponent
} from './pages';
import { AuthLayoutComponent, DashboardLayoutComponent } from './layouts';
import { PrivateGuard, PublicGuard } from './guards';

export const appRoutes: Route[] = [
    {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full"
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
            { path: "", component: TodosPageComponent },
        ]
    },
    { path: "**", component: NotFoundPageComponent }
];
