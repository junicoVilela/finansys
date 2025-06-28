import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true,
  imports: [RouterLink, NgIf, NgClass]
})
export class PageHeaderComponent implements OnInit {

  @Input('page-title') pageTitle: string;
  @Input('show-button') showButton: boolean = true;
  @Input('button-class') buttonClass: string;
  @Input('button-text') buttonText: string;
  @Input('button-link') buttonLink: string;
  @Input('subtitle') subtitle: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  getSubtitle(): string {
    if (this.subtitle) {
      return this.subtitle;
    }
    
    // Subtítulo padrão baseado no contexto
    if (this.pageTitle.toLowerCase().includes('categoria')) {
      return 'Gerencie suas categorias financeiras de forma organizada';
    } else if (this.pageTitle.toLowerCase().includes('entrada') || this.pageTitle.toLowerCase().includes('lançamento')) {
      return 'Registre suas receitas e despesas de forma simples';
    } else if (this.pageTitle.toLowerCase().includes('relatório')) {
      return 'Visualize seus dados financeiros com gráficos e análises';
    } else {
      return 'Gerencie suas finanças de forma inteligente';
    }
  }
}
