import { Component } from '@angular/core';
import { customers } from './mock-data';
import { Customer } from './model/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = "Insurance Co."
  customers: Customer[] = customers;
  filteredCustomers: Customer[] = [];
  inputText: string = "";

  filterCustomers() {
    if (this.inputText)
      this.filteredCustomers = customers.filter((customer: Customer) =>
        customer.firstName?.toLowerCase().includes(this.inputText) || customer.lastName?.toLowerCase().includes(this.inputText) || customer.policyNo?.includes(this.inputText)
      );
    else
      this.filteredCustomers = [];
  }

  addSelected(customer: Customer) {
    this.filteredCustomers = [];
    this.inputText = "";
    alert(customer.firstName + " " + customer.lastName + " selected");
  }

  clear() {
    this.filteredCustomers = [];
    this.inputText = "";
  }
}
