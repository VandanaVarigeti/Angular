import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSetupComponent } from './Components/account-setup/account-setup.component';
import { AccountComponent } from './Components/account/account.component';
import { AddCustomerComponent } from './Components/add-customer/add-customer.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { SignupComponent } from './Components/signup/signup.component';
import { UpdateProfileComponent } from './Components/update-profile/update-profile.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';



export const routes: Routes = [
   // {path:'', redirectTo:"/welcome" ,pathMatch:'full'},
    // {path:'welcome', component: WelcomeComponent},
    {path:'login', component: LoginComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'signup', component:SignupComponent},
    {path:'account-setup', component:AccountSetupComponent},
    {path:'account', component:AccountComponent},
    {path:'update', component:UpdateProfileComponent},
    {path:'customer', component:AddCustomerComponent},
    {path:'register', component:RegisterComponent },
    {path:'forgot-password', component:ForgotPasswordComponent},
    {path:'', component:LoginComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes), HttpClientModule],
    exports: [RouterModule]
})
export class AppRoutes{ }
