import { Owner } from './owner';
import { PetType } from './pettype';
import { Visit } from './visit';

export class Pet {
  [x: string]: any;
  id: string = '';
  name: string = '';
  birthDate: string = '';
  owner: Owner = new Owner();
  type: PetType = new PetType();
  visits: Visit[] = [];
}
