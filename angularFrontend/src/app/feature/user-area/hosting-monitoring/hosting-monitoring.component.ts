import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hosting-monitoring',
  templateUrl: './hosting-monitoring.component.html',
  styleUrls: ['./hosting-monitoring.component.css']
})
export class HostingMonitoringComponent implements OnInit {
  id: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

}
