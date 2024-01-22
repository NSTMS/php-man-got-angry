import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [],
  templateUrl: './field.component.html',
  styleUrl: './field.component.css'
})
export class FieldComponent implements OnInit{
  @Input() type : string = "";
  @Input() color : string = "";
  @Input() idx : number = 0;

  ngOnInit(){}
}
