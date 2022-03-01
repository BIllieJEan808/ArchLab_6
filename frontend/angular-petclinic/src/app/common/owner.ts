import { Pet } from './pet';

export class Owner {
  [x: string]: any;
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  city: string = '';
  telephone: string = '';
  pets: Pet[] = [];
}
