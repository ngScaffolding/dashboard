import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthoriseRoleGuard } from '@ngscaffolding/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
    { path: ':id', component: DashboardComponent, canActivate: [AuthoriseRoleGuard] },
    { path: '', component: DashboardComponent, canActivate: [AuthoriseRoleGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
