import { Component, Injector } from '@angular/core';

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";
import {BaseResourceListComponent} from "../../../shared/components/base-resource-list/base-resource-list.component";

import { BreadCrumbComponent } from "../../../shared/components/bread-crumb/bread-crumb.component";
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { DateFormatPipe } from "../../../shared/pipes/date-format.pipe";

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
  standalone: true,
  imports: [BreadCrumbComponent, PageHeaderComponent, RouterLink, NgFor, NgIf, NgClass, CurrencyPipe, DateFormatPipe]
})
export class EntryListComponent extends BaseResourceListComponent<Entry>{

  constructor(
    private entryService: EntryService,
    protected override injector: Injector
  ) {
    super(entryService, injector)
  }

}
