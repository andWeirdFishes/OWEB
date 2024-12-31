import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompComponent } from "./comp/comp.component";
import { DRIVERS } from '../db-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CompComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'test';
  d = DRIVERS;
  onAppView() {
    window.alert("One two three")
  }
  Surprise() {
    let arr = this.d;
    let n = arr.length;
    if (n === 0) {
      window.alert("Prazna niza!");
      return;
    }
    let rnd = Math.floor(Math.random() * n);
    let removedElement = arr.splice(rnd, 1);
    window.alert("Ups! :)")
  }
}