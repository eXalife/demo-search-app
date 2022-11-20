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
    if (this.inputText) {
      this.inputText = this.inputText.replace(/[^\p{L}\d\s]/gu, ""); // remove special characters while allowing most unicode characters

      /*    
        split input to array for multi object property search
        for example:  { "firstName": "Lonny", "lastName": "Bartkowiak", "email": "lbartkowiak1p@g.co", "policyNo": "0083188917", "phoneNo": "+504-436-467-4266" }
        user can search for this record with "lon bart 831" 
      */
      const inputWords: string[] = this.inputText.toLowerCase().split(" ").filter(word => word !== ""); // transform to lowercase, split and clear empty words

      // filter array with search
      const searchMultiMap: Map<number, Customer[]> = new Map<number, Customer[]>(); // multimap for search result. key is similarity point, value is list of results
      for (const customer of customers) {
        let result: number = 0; // similarity point
        for (const input of inputWords) {
          if (customer.firstName?.toLowerCase().startsWith(input) || customer.lastName?.toLowerCase().startsWith(input) || customer.policyNo?.includes(input))
            result++; // increase similarity point
        }
        if (result > 0) {
          if (searchMultiMap.has(result)) { // if map has key just add to existing result list
            searchMultiMap.get(result)?.push(customer);
          } else { // else create new array with result for key
            searchMultiMap.set(result, [customer]);
          }
        }
      }

      this.mergeSearchResultMultimap(searchMultiMap);
    }
    else
      this.filteredCustomers = []; // clear filtered results
  }

  mergeSearchResultMultimap(searchMultiMap: Map<number, Customer[]>) {
    this.filteredCustomers = [];
    const keys: number[] = Array.from(searchMultiMap.keys()).sort((a, b) => b - a); // descending sort of keys(similarity points)
    for (const key of keys) {
      const arr: Customer[] | undefined = searchMultiMap.get(key);
      if (arr)
        this.filteredCustomers = this.filteredCustomers.concat(arr); // merge results
    }
  }

  setSelected(customer: Customer) {
    this.clear();
    alert(customer.firstName + " " + customer.lastName + " selected");
  }

  clear() {
    this.filteredCustomers = [];
    this.inputText = "";
  }
}
