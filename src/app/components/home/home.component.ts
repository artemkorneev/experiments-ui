import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  languages: string[] = [
    'Java',
    'Kotlin',
    'C#',
    'Python'
  ];
  unitForm: FormGroup;
  validateMessage: string = "";

  constructor(private unitService: UnitService) {}

  ngOnInit() {
    this.unitForm = new FormGroup({
      name: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required)
    });
  }

  submitRegistration() {
    if (this.unitForm.valid) {
      this.validateMessage = "Your unit registration has been submitted. Thank you!";
      this.unitService.createUnitRegistration(this.unitForm.value).subscribe(
        data => {
          this.unitForm.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      );
    } else {
      this.validateMessage = "Please fill out the form before submitting!";
    }
  }
}
