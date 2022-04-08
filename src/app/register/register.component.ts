import { Component, OnInit } from '@angular/core';
import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Router } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordIcon: string = "visibility";
  confirmPasswordIcon: string = "visibility";
  spinner: boolean = false;
  error: boolean = false;
  success: boolean = false;
  errorMessage: String = "";
  successMessage: String = "";
  registrationForm: any = this.formBuilder.group({
    name: ["", [Validators.required]],
    surname: ["", [Validators.required]],
    email: [
      "",
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"),
      ],
    ],
    password: ["", [Validators.required]],
    confirmPassword: ["", [Validators.required]],
  });

  constructor(
    public formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public registerUser(): void {
    this.spinner = true;
    this.error = false;
    if ( this.registrationForm.get("password").value != this.registrationForm.get("confirmPassword").value) {
      this.error = true;
      this.spinner = false;
      this.errorMessage = "Please ensure the passwords match";
    } else {
      this.httpClient
        .post(
          `${environment.apiURL}/register-user`,
          {
            firstname: this.registrationForm.get("name").value,
            lastname: this.registrationForm.get("surname").value,
            password: this.registrationForm.get("password").value,
            email: this.registrationForm.get("email").value,
          },
          { responseType: "text" }
        )
        .subscribe(
          (response) => {
            console.log(response);
            this.spinner = false;
            switch (response) {
              case "User already exists":
                this.error = true;
                this.errorMessage = "User already exists";
                break;
              case "Ok":
                this.success = true;
                this.successMessage = "User successfully registered";
                break;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }

    console.log("Register new user");
  }

  public errorHandling = (control: string, error: string) => {
    return this.registrationForm.controls[control].hasError(error);
  };

  public changePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordIcon =
      this.passwordIcon == "visibility" ? "visibility_off" : "visibility";
  }

  public changeConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
    this.confirmPasswordIcon =
      this.confirmPasswordIcon == "visibility"
        ? "visibility_off"
        : "visibility";
  }

  public gotoLogin(): void {
    this.router.navigate(["/"]);
  }

}
