import { Pet } from './pet';

export class Visit {
  id: string = '';
  visitDate: string = '';
  description: string = '';
  pet: Pet = new Pet();
}
