import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/common/owner';
import { Pet } from 'src/app/common/pet';
import { PetType } from 'src/app/common/pettype';
import { OwnerService } from 'src/app/services/owner.service';
import { PetService } from 'src/app/services/pet.service';
import { PetTypeService } from 'src/app/services/pettype.service';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.css'],
})
export class PetAddComponent implements OnInit {
  pet: Pet = new Pet();
  @Input() currentType: PetType = new PetType();
  currentOwner: Owner = new Owner();
  currentOwnerId: number = 0;
  petTypes: PetType[] = [];

  constructor(
    private ownerService: OwnerService,
    private petService: PetService,
    private petTypeService: PetTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pet.birthDate = '2000-09-06T22:00:00.000+00:00';

    this.currentOwnerId = +this.route.snapshot.paramMap.get('id')!;
    this.ownerService.getOwner(this.currentOwnerId).subscribe(
      (owner) => {
        this.currentOwner = owner;
      },
      (error) => console.error(error)
    );

    this.petTypeService.getPetTypeList().subscribe((types) => {
      this.petTypes = types;
      this.pet.type = this.petTypes[0];
    });
  }

  createPet() {
    this.petService.createPet(this.generatePayload()).subscribe(
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
      owner: this.currentOwner['_links'].self.href,
      type: this.pet.type['_links'].self.href,
    };
  }

  goToCurrentOwnerDetail() {
    this.router.navigate([`/owners/${this.currentOwnerId}`]);
  }

  onSubmit() {
    this.createPet();
  }
}
