import { Company } from './company.model';
import {Image} from "./image.model";
export class Avion {
    idAvions! : number;
    nomAvions! : string;
    prixAvions! : number;
    dateCreation! : Date ;
    company! : Company;
    image! : Image
    imageStr!:string
    }
