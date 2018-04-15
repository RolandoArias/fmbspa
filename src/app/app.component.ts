import { Component, OnInit } from '@angular/core';
import { PnnService } from './providers/pnn.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private pnnServ: PnnService){}

  ngOnInit(){
    this.pnnServ.getAll();
  }
}
