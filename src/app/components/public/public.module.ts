import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicHomeComponent } from './public-home/public-home.component';
import {TagModule} from 'primeng/tag';
import {CarouselModule} from 'primeng/carousel';
import {Button} from 'primeng/button';
import {HttpClient} from '@angular/common/http';
import {DataViewModule} from 'primeng/dataview';
import {MatTooltipModule} from "@angular/material/tooltip";
import {TooltipModule} from "primeng/tooltip";
import {MultiSelectModule} from 'primeng/multiselect';
import {FormsModule} from '@angular/forms';
import {MegaMenuModule} from 'primeng/megamenu';


@NgModule({
  declarations: [
    PublicHomeComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    TagModule,
    CarouselModule,
    MatTooltipModule,
    Button,
    TooltipModule,
    MultiSelectModule,
    FormsModule,
    MegaMenuModule,
  ]
})
export class PublicModule { }
