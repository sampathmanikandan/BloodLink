import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Header } from './app/components/header/header';
import { Hero } from './app/components/hero/hero';
import { Register } from './app/components/register/register';
import { Search } from './app/components/search/search';
import { About } from './app/components/about/about';
import { Footer } from './app/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Register, Search, About, Footer],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <app-hero></app-hero>
      <app-register></app-register>
      <app-search></app-search>
      <app-about></app-about>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      overflow-x: hidden;
    }
  `]
})
export class App {
  name = 'BloodLink';
}

bootstrapApplication(App);
