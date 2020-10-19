import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public nombre:String="Steven";
  public apellido:String="Calderón";
  constructor() { }

  ngOnInit(): void {
  }

}
