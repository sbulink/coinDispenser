import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { UserStore } from "../user-store";
import { ApiServiceService } from "../api-service.service"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  firstname: String = "";
  lastname: String = "";
  amount: number = 0;
  ELEMENT_DATA: any[] = [
    {
      tenCent: 100,
      twentyCent: 100,
      fiftyCent: 100,
      oneRand: 100,
      twoRand: 100,
      fiveRand: 100,
    },
  ];
  displayedColumns: string[] = [
    "coins",
    "tenCent",
    "twentyCent",
    "fiftyCent",
    "oneRand",
    "twoRand",
    "fiveRand",
  ];
  dataSource = [
    {
      tenCent: 0,
      twentyCent: 0,
      fiftyCent: 0,
      oneRand: 0,
      twoRand: 0,
      fiveRand: 0,
    },
  ];
  constructor(
    private userStore: UserStore,
    private httpClient: HttpClient,
    private router: Router,
    public apiServiceService : ApiServiceService
  ) {

    if(this.apiServiceService != null)
      this.userStore = this.apiServiceService.getUserStore();
      
      this.firstname = this.userStore.getFirstName();
      this.lastname = this.userStore.getLastName();
      console.log(this.firstname);
      console.log(this.lastname);
  }

  ngOnInit(): void {}

  public getDenominations() {
    console.log(this.amount);
    this.httpClient
      .get(`${environment.apiURL}/denominations/` + this.amount, {
        responseType: "json",
      })
      .subscribe((response: any) => {
        console.log(response);
        this.dataSource = [response];
      });
  }

  public doLogout() {
    this.router.navigate(["/"]);
  }
}
