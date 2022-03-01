import { Component, Input, OnInit } from '@angular/core';
import { Pet } from 'src/app/common/pet';
import { PetType } from 'src/app/common/pettype';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit {
  @Input() pet: Pet = new Pet();
  deleteSuccess = false;

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.pet.type = new PetType();
    this.petService.getPetTypeByPetId(+this.pet.id).subscribe((type) => {
      this.pet.type = type;
    });

    this.petService.getVisitByPetId(+this.pet.id).subscribe((visits) => {
      this.pet.visits = visits;
    });
  }

  deletePet() {
    this.petService.deletePet(+this.pet.id).subscribe((data) => {
      this.deleteSuccess = true;
      this.pet = new Pet();
    });
  }
}
