import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { DropdownDirective } from "./dropdown.directive";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [AlertComponent, LoadingSpinnerComponent, DropdownDirective, PlaceHolderDirective],//created inside this module
    imports: [CommonModule],//coming from Angular(and also from other modules if used)
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        PlaceHolderDirective,
        CommonModule//!!if we import this SharedModule outside, we dont have to import CommonModule!!!
    ],//exported to be used in other modules
})
export class SharedModule {

}