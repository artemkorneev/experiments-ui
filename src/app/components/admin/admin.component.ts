import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public units;

  constructor(private unitService: UnitService) { }

  ngOnInit() {
    this.getUnits();
  }

  getUnits() {
    this.unitService.getUnits().subscribe(
      data => { this.units = data },
      err => console.error(err),
      () => console.log('units loaded')
    );
  }
}
