import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

interface BreadCrumbItem {
  text: string;
  link?: string;
}

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
  standalone: true,
  imports: [RouterLink, NgFor, NgIf]
})
export class BreadCrumbComponent implements OnInit {

  @Input() items: Array<BreadCrumbItem> = [];

  constructor() { }

  ngOnInit(): void {
  }

  isLastItem(item: BreadCrumbItem): boolean {
    const index = this.items.indexOf(item);
    return index + 1 === this.items.length;
  }

}
