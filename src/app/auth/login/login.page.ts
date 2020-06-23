import { UserLoginInfo, UserInfo } from './../../models/user';
import { LoginUser, RegisterUser, LoginUserFailure } from './state/login.actions';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/state';
import * as loginSelectors from './state/login.selectors'
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Keyboard } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginFormActive = true;
  showLogo = true;
  formSubmitted = false;
  form: FormGroup;
  readonly LOGIN_STRING = 'login';
  readonly REGISTER_STRING = 'register';

  constructor(
    private _formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private store: Store<State>,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public platform: Platform
  ) { }


  ngOnInit() {
    this.assignForm();

    if (this.platform.is('mobile')) {
      Keyboard.addListener('keyboardWillShow', () => {
        this.toggleLogo(false);
      });
  
      Keyboard.addListener('keyboardWillHide', () => {
        this.toggleLogo(true);
      });
    }

    this.store.pipe(select(loginSelectors.getRegisteredUser)).subscribe((userlogininfo: UserLoginInfo) => {
      if (Object.keys(userlogininfo).length) {
        this.loginFormActive = true;
        this.assignForm();
        for (const key in userlogininfo) {
          if (userlogininfo.hasOwnProperty(key)) {
            this.form.get(key).setValue(userlogininfo[key]);
          }
        }
        this.showRegistrationAlert();
      }
    });

    this.store.pipe(select(loginSelectors.getLoggedInUser)).subscribe((userInfo: UserInfo) => {
      if (userInfo) {
        this.router.navigate(['/pokedex']);
      }
    });

    this.store.pipe(select(loginSelectors.getLoginError)).subscribe((loginError: boolean) => {
      if (!loginError) return;
      this.showErrorLoginToast();
      this.store.dispatch(new LoginUserFailure(false));
    })

  }

  toggleLogo(show: boolean): void {
    this.showLogo = show;
    this.changeDetector.detectChanges();
  }

  assignForm() {
    this.form = undefined;
    this.formSubmitted = false;
    this.changeDetector.detectChanges();
    this.form = this.loginFormActive ? this.loginForm : this.registerForm;
  }

  formSubmit() {
    this.formSubmitted = true;
    if (!this.form.valid) {
      return;
    }
    if (this.loginFormActive) {
      this.store.dispatch(new LoginUser(this.form.value))
    } else {
      this.store.dispatch(new RegisterUser(this.form.value))
    }
  }

  segmentChanged(event: CustomEvent) {
    const newValue = event.detail.value === this.LOGIN_STRING;
    if (this.loginFormActive !== newValue) {
      this.loginFormActive = newValue;
      this.assignForm();
    }
  }

  async showRegistrationAlert() {
    const alert = await this.alertController.create({
      message: 'You are all set now!!.<br><br>Login to catch a lot of pokemons!!',
      buttons: ['Close']
    });
    await alert.present();
  }

  async showErrorLoginToast() {
    const toast = await this.toastController.create({
      color: 'light',
      message: 'Invalid email or password, just try again!!.',
      duration: 3000,
      buttons: [
       {
          icon: 'close-circle',
          role: 'cancel',
          handler: () => {}
        }
      ],
    });
    toast.present();
  }

  get loginForm(): FormGroup {
    return this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  get registerForm(): FormGroup {
    return this._formBuilder.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  getFieldErrorState(fieldName: string) {
    const fieldControl = this.form.get(fieldName);
    return (this.formSubmitted || fieldControl.touched) && fieldControl.errors;
  }

  get showFirstnameError(): boolean {
    const errorState = this.getFieldErrorState('firstname');
    return errorState && errorState.hasOwnProperty('required');
  }

  get showLastnameError(): boolean {
    const errorState = this.getFieldErrorState('lastname');
    return errorState && errorState.hasOwnProperty('required');
  }

  get showPasswordError(): boolean {
    const errorState = this.getFieldErrorState('password');
    return errorState && errorState.hasOwnProperty('required');
  }

  showEmailError(): { required: boolean, email: boolean } {
    const errorState = this.getFieldErrorState('email');
    const errors = {
      required: errorState && errorState.hasOwnProperty('required'),
      email: errorState && errorState.hasOwnProperty('email'),
    }
    return errors;
  }
}
