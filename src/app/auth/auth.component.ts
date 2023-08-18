import { Component, ComponentFactoryResolver, EventEmitter, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from "@ngrx/store";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy, OnInit {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    //we can also pass type to viewchild
    @ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective;//viewchild will find thre first occurence of this directive
    private closeSub: Subscription;
    private storeSub: Subscription;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store<fromApp.AppState>) { }
    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error) {
                this.showErrorAlert(this.error);
            }

        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(form: NgForm) {
        if (form.invalid)
            return;
        const email = form.value.email;
        const password = form.value.password;

        if (this.isLoginMode) {
            // authObservable = this.authService.login(email, password);
            this.store.dispatch(AuthActions.loginStart({ email: email, password: password }));
        }
        else {
            // authObservable = this.authService.signup(email, password);
            this.store.dispatch(AuthActions.signupStart({ email: email, password: password }));
        }

        // authObservable.subscribe(responseData => {
        //     //console.log(responseData);
        //     this.isLoading = false;
        //     this.router.navigate(['/recipes']);
        // }, errorMessage => {
        //     console.log(errorMessage);
        //     this.error = errorMessage;
        //     this.showErrorAlert(errorMessage);
        //     this.isLoading = false;

        // });
        form.reset();
    }


    onHandleError() {
        this.store.dispatch(AuthActions.clearError());

    }
    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }

    //dynamically creating component from inside code 
    private showErrorAlert(message: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();//viewcontainerreference is object allows you to interact with that place in the dom
        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });


    }


}