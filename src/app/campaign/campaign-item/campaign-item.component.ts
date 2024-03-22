import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocumentData } from 'firebase/firestore';

@Component({
  selector: 'app-campaign-item',
  templateUrl: './campaign-item.component.html',
  styleUrls: ['./campaign-item.component.css']
})
export class CampaignItemComponent implements OnChanges{
  @Input() item = {} as DocumentData;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, this.item)
  }
}