import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgFor } from '@angular/common';

import { Category } from "../../categories/shared/category.model";
import { CategoryService } from "../../categories/shared/category.service";

import { Entry } from "../../entries/shared/entry.model";
import { EntryService } from "../../entries/shared/entry.service";

import currencyFormatter from "currency-formatter";
import { DateUtils } from "../../../shared/utils/date.utils";

import { BreadCrumbComponent } from "../../../shared/components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  standalone: true,
  imports: [BreadCrumbComponent, PageHeaderComponent, ChartModule, NgFor]
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0

  expenseChartData: any;
  revenueChartData: any;

  basicOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  };

  categories: Category[] = [];
  entries: Entry[] = [];

  // Usando DateUtils para gerar listas de meses e anos
  months = DateUtils.getMonthsOptions();
  years = DateUtils.getYearsRange(2020, 2030);

  @ViewChild('month') month: ElementRef | any = null;
  @ViewChild('year') year: ElementRef | any = null;

  constructor(private entryService: EntryService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
        categories => this.categories = categories
    )
  }

  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if(!month || !year) {
      alert('Você precisa selecionar o Mês e o Ano para gerar os relatórios')
    } else {
      this.entryService.filterByMonthAndYear(month, year).subscribe(this.setValues.bind(this));
    }
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if(entry.type == 'revenue') {
        revenueTotal += entry.amount!;
      }

      if(entry.type == 'expense') {
        expenseTotal += entry.amount!;
      }

    });

    this.expenseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL'});
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL'});
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, { code: 'BRL'});
  }

  private setChartData() {
    this.revenueChartData =  this.getChartData('revenue', 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartData =  this.getChartData('expense', 'Gráfico de Despesas', '#E03131');
  }

  private getChartData(entryType: string, title: string, color: string) {
    const chartData: any = [];

    this.categories.forEach(category => {
      const filteredEntries = this.entries.filter(entry => (entry.categoryId == category.id) && (entry.type == entryType));

      if(filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
            (total, entry) => total + entry.amount!, 0
        )

        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        })
      }
    });

   return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    }
  }

}
