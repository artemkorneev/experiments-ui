import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.css']
})
export class ViewRegistrationComponent implements OnInit {

  public unitReg;

  constructor(private unitService: UnitService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUnitReg(this.route.snapshot.params.id);
  }

  getUnitReg(id: number) {
    this.unitService.getUnit(id).subscribe(
      data => {
        this.unitReg = data;
      },
      err => console.error(err),
      () => console.log('unit loaded')
    );
  }
}
