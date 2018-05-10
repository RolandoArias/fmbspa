import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { Location } from '@angular/common';

import * as $ from 'jquery';
import {Router} from "@angular/router";
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  displayedColumns = ['selected', 'numberA', 'id', 'name', 'interest', 'mail', 'last'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  reesults: any;
  cantidad: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,private location: Location) {
  }

  ngOnInit() {
   
          let h = JSON.parse(localStorage.getItem('search_value'));
          this.cantidad = h.length;
      this.reesults  = h;   
  }

  onGoto(url:string){
    this.router.navigate([url]);
  }
  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}


export interface Element {
  name: string;
  numberA: number;
  id: number;
  interest: string;
  mail: string;
  last: string;
  selected: boolean;
}

const ELEMENT_DATA: Element[] = [
  {numberA: 99866445, id: 60189098, name: 'Hydrogen', interest: 'Licenciatura', mail: 'juan@gmail.com', last: 'Juanito', selected: false},
  {numberA: 99866445, id: 60189098, name: 'Helium', interest: 'Licenciatura', mail: 'juan@gmail.com', last: 'Juanito', selected: false},
  {numberA: 99866445, id: 60189098, name: 'Lithium', interest: 'Licenciatura', mail: 'juan@gmail.com', last: 'Juanito', selected: false},
  {numberA: 99866445, id: 60189098, name: 'Beryllium', interest: 'Licenciatura', mail: 'juan@gmail.com', last: 'Juanito', selected: false},
  {numberA: 99866445, id: 60189098, name: 'Boron', interest: 'Licenciatura', mail: 'juan@gmail.com', last: 'Juanito', selected: false},
  {numberA: 99866445, id: 60189098, name: 'Carbon', interest: 'Licenciatura', mail: 'juan@gmail.com', last: 'Juanito', selected: false},
  {numberA: 99866445, id: 60189098, name: 'Nitrogen', interest: 'Licenciatura', mail: 'juan@gmail.com', last: 'Juanito', selected: false},
];
