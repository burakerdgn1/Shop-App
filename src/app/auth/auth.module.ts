import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: AuthComponent }
        ]
        )
        ,
        SharedModule,

    ],
})
export class AuthModule {

}