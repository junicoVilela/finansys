import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface EmptyStateConfig {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent {
  @Input() config!: EmptyStateConfig;
} 