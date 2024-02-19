// import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  dataOfForm: any;
  property!: string;
  datepicker: any;
  array: { texts: string, dates: string }[] = [];
  mus: any;
  completearray: { texts: string, dates: string }[] = [];
  minDate: any;
  dateError: any;
  @ViewChild('formData') myForm!: NgForm;
  
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.getlocalstorage();
    this.setMinDate()
  }

  setMinDate() {
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in the 'YYYY-MM-DD' format
    this.minDate = currentDate;
  }

  submitAfterFill(formData: any) {
    const cdate = moment();
    const currentDate  = cdate.format('YYYY-MM-DD');
    const selectedDate = moment(formData.value.dates, 'YYYY-MM-DD');
    this.dataOfForm = formData.value;
    if(moment(selectedDate).isBefore(currentDate)){
      this.dateError = 'Please select a present or future date';
      return; // Do not proceed if the form is invalid
    }else{
      this.dateError = null; // Reset the error when the date is valid
    // Capitalize the first letter and trim extra spaces
    this.dataOfForm.texts = this.capitalizeFirstLetter(this.dataOfForm.texts.trim());
    // Submit the form data as usual
    if (this.mus == null) {
      this.array.push(this.dataOfForm);
    } else {
      this.array[this.mus] = this.dataOfForm;
      this.mus = null;
    }
    // Reset the form and set localstorage value after adding the task
    formData.resetForm();
    this.setlocalstorage();
  }
}

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  deletetask(i: number) {
    this.array.splice(i, 1);
    this.setlocalstorage();
  }

  edittask(i: number) {
    this.mus = i;
    // Retrieve the task to be edited
    const taskToEdit = this.array[this.mus];
    // Set the values of the input fields using ngModel
    this.myForm.setValue({
      texts: taskToEdit.texts,
      dates: taskToEdit.dates
    });
  }
  

  setlocalstorage() {
    localStorage.setItem('data', JSON.stringify(this.array));
    localStorage.setItem('datatwo', JSON.stringify(this.completearray));
  }

  getlocalstorage() {
    const item = localStorage.getItem('data');
    const itemtwo = localStorage.getItem('datatwo');
    if (item !== null && item !== undefined) {
      this.array = JSON.parse(item);
    }
    if (itemtwo !== null && itemtwo !== undefined) {
      this.completearray = JSON.parse(itemtwo);
    }
  }

  donetask(i: number) {
    const completedTask = this.array.splice(i, 1)[0];
    this.completearray.push(completedTask);
    console.log("h", this.completearray);

    this.setlocalstorage();
  }

  pendingtask(i: number) {
    const pendingTask = this.completearray.splice(i, 1)[0];
    this.array.push(pendingTask);
    console.log("k", this.array)
    this.setlocalstorage();
  }
  openDialog(){
    this.dialog.open(DialogBoxComponent,{
      width:'290px',
      data:"right"
    })
  }
  
}

