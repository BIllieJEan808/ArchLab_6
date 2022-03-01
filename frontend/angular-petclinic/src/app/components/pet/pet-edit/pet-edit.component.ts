import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/common/owner';
import { Pet } from 'src/app/common/pet';
import { PetType } from 'src/app/common/pettype';
import { PetService } from 'src/app/services/pet.service';
import { PetTypeService } from 'src/app/services/pettype.service';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css'],
})
export class PetEditComponent implements OnInit {
  pet: Pet = new Pet();
  @Input() currentType: PetType = new PetType();
  currentOwner: Owner = new Owner();
  petTypes: PetType[] = [];

  constructor(
    private petService: PetService,
    private petTypeService: PetTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.petTypeService.getPetTypeList().subscribe((types) => {
      this.petTypes = types;
    });

    const petId = +this.route.snapshot.paramMap.get('id')!;
    this.petService.getPet(petId).subscribe((pet) => {
      this.pet = pet;
      this.petService.getOwnerByPetId(petId).subscribe((owner) => {
        this.currentOwner = owner;
        this.pet.owner = owner;
      });

      this.petService.getTypeByPetId(petId).subscribe((type) => {
        this.currentType = type;
        this.currentType = type;
        this.pet.type = type;
      });
    });
  }

  updatePet() {
    console.log(this.generatePayload());

    this.petService.updatePet(this.generatePayload(), +this.pet.id).subscribe(
      (data) => {
        this.goToCurrentOwnerDetail();
      },
      (error) => console.log(error)
    );
  }

  generatePayload() {
    return {
      name: this.pet.name,
      birthDate: this.pet.birthDate,
      type: this.pet.type['_links'].self.href,
    };
  }

  goToCurrentOwnerDetail() {
    this.router.navigate([`/owners/${this.pet.owner.id}`]);
  }

  onSubmit() {
    this.updatePet();
  }
}
