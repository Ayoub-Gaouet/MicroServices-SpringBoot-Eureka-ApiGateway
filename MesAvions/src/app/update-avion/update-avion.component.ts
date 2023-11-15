import { Component, OnInit } from '@angular/core';
import { AvionService } from '../services/avion.service';
import { Avion } from '../model/avion.model';
import { ActivatedRoute,Router } from '@angular/router';
import { Company } from '../model/company.model';
import {Image} from "../model/image.model";
@Component({
  selector: 'app-update-avion',
  templateUrl: './update-avion.component.html',
  styles: [
  ]
})
export class UpdateAvionComponent implements OnInit {
  company! : Company[];
  updatedComId! : number;
  currentAvion = new Avion();
  myImage! : string;
  uploadedImage!: File;
  isImageUpdated: Boolean=false;
  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
  private avionService: AvionService) { }
  ngOnInit(): void {
    this.avionService.listeCompany().
    subscribe(cats => {console.log(cats);
    this.company = cats;
    }
    );
    this.avionService.consulterAvion(this.activatedRoute.snapshot.params['id']).
    subscribe( av =>{ this.currentAvion = av;
    this.updatedComId = this.currentAvion.company.idCom;
      this.avionService
        .loadImage(this.currentAvion.image.idImage)
        .subscribe((img: Image) => {
          this.myImage = 'data:' + img.type + ';base64,' + img.image;
        });
    } ) ;
    }
  updateAvion() {
    this.currentAvion.company = this.company.find(com => com.idCom == this.updatedComId)!;
    if (this.isImageUpdated)
    {
      this.avionService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentAvion.image = img;
          this.avionService
            .updateAvion(this.currentAvion)
            .subscribe((av) => {
              this.router.navigate(['avions']);
            });
        });
    }
    else{
      this.avionService.updateAvion(this.currentAvion).subscribe(av => {
      this.router.navigate(['avions']); }
      );
    }
    }
  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated =true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

}
