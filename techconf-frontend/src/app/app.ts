import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharlaRegistroComponent } from './components/charla-registro.component/charla-registro.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CharlaRegistroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('techconf-frontend');
}
