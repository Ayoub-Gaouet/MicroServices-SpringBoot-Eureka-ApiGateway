import { Component, OnInit } from '@angular/core';
import { AvionService } from '../services/avion.service';
import { Avion } from '../model/avion.model';
import { Company } from '../model/company.model';

@Component({
  selector: 'app-recherche-par-company',
  templateUrl: './recherche-par-company.component.html',
  styles: [
  ]
})
export class RechercheParCompanyComponent implements OnInit {
  avions! : Avion[];
  IdCompany! : number;
  company! : Company[];
  constructor(private avionService: AvionService) { }

  ngOnInit(): void {
    this.avionService.listeCompany().
    subscribe(cats => {this.company = cats;
      console.log(cats);
    });
  }
  onChange() {
    this.avionService.rechercherParCompany(this.IdCompany).
    subscribe(prods =>{this.avions=prods});
  }
}
