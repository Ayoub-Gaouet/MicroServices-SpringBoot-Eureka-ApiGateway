import { Component, OnInit } from '@angular/core';
import { AvionService } from '../services/avion.service';
import { Avion } from '../model/avion.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {
  avions! : Avion[];
  allAvions! : Avion[];
  searchTerm!: string;
  constructor(private avionService: AvionService) { }

  ngOnInit(): void {
    this.avionService.listeAvions().subscribe(prods => {
      console.log(prods);
      this.allAvions = prods;
      });

  }
  onKeyUp(filterText : string){
    this.avions = this.allAvions.filter(item =>
    item.nomAvions.toLowerCase().includes(filterText));
    }


}
