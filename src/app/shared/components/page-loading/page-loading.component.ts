import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PageLoadingConfig {
  title: string;
  description: string;
}

@Component({
  selector: 'app-page-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.scss']
})
export class PageLoadingComponent {
  @Input() config!: PageLoadingConfig;
} 