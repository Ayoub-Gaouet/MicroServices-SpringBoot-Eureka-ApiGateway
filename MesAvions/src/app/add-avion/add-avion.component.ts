import { ActivatedRoute, Router } from '@angular/router';
import { AvionService } from '../services/avion.service';
import { Component, OnInit } from '@angular/core';
import { Avion } from '../model/avion.model';
import {Image} from "../model/image.model";
import {Company} from "../model/company.model";

@Component({
  selector: 'app-add-avion',
  templateUrl: './add-avion.component.html',
  styleUrls: ['./add-avion.component.css']
})
export class AddAvionComponent implements OnInit {
  newAvion = new Avion();
  company!: Company[];

  newIdCom!: number;
  uploadedImage!: File;
  imagePath: any;
  constructor(private avionService: AvionService, private activatedRoute: ActivatedRoute,private Router: Router,) { }

  ngOnInit(): void {
    this.avionService.listeCompany().
    subscribe(cats => {this.company = cats;
      console.log(cats);
    }
    );
    }
  addAvion(){
    this.avionService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
        this.newAvion.image=img;
        this.newAvion.company = this.company.find(com => com.idCom
          == this.newIdCom)!;
        this.avionService
          .ajouterAvion(this.newAvion)
          .subscribe(() => {
            this.Router.navigate(['avions']);
          });
      });
  }
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }
}
