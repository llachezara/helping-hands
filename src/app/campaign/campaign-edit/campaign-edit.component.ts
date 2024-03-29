import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent {
  regions = ['Vidin', 'Sliven'];
  editForm = this.fb.group({
    title: ['', Validators.required],
    imageUrl: ['', Validators.required],
    description: ['', Validators.required],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    phoneNumber: ['', Validators.required],
    region: [null, Validators.required],
  });
  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.editForm);
  }
}
