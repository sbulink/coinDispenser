import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserStore } from "../user-store";
import { environment } from "./../../environments/environment";
import { ApiServiceService } from "../api-service.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  icon: string = "visibility";
  showPassword: boolean = false;
  errorMessage: String = "";
  error: boolean = false;
  spinner: boolean = false;

  
  loginForm: any = this.formBuilder.group({
    email: [
      "",
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"),
      ],
    ],
    password: ["", [Validators.required]],
  });
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private userStore: UserStore,
    public apiServiceService: ApiServiceService
  ) {}

  ngOnInit(): void {}

  changeVisibility() {
    this.showPassword = !this.showPassword;
    this.icon = this.icon == "visibility" ? "visibility_off" : "visibility";
  }

  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  };

  public logIn() {
    this.spinner = true;
    this.spinner = false;
    this.httpClient
      .post(
        `${environment.apiURL}/login`,
        {
          email: this.loginForm.get("email").value,
          password: this.loginForm.get("password").value,
        },
        { responseType: "text" }
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.spinner = false;
          switch (response) {
            case "Invalid password or email":
              this.error = true;
              this.errorMessage = "Invalid password or email";
              break;
            case "User does not exist":
              this.error = true;
              this.errorMessage = "User does not exist";
              break;
            case "Ok":
              this.httpClient
                .get(
                  `${environment.apiURL}/getUserDetails` +
                    `/` +
                    this.loginForm.get("email").value,
                  { responseType: "json" }
                )
                .subscribe((response: any) => {
                  this.userStore.setEmail(response.email);
                  this.userStore.setFirstName(response.firstname);
                  this.userStore.setLastName(response.lastname);

                  this.apiServiceService.setUserStore(this.userStore);
                  console.log(this.userStore)
                });
              this.router.navigate(["/home"]);
              break;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public registerUser(): void {
    this.router.navigate(["/register-user"]);
  }
}
