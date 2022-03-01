import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/common/pet';
import { Visit } from 'src/app/common/visit';
import { PetService } from 'src/app/services/pet.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-visit-add',
  templateUrl: './visit-add.component.html',
  styleUrls: ['./visit-add.component.css'],
})
export class VisitAddComponent implements OnInit {
  petId: number = 0;
  currentPet: Pet = new Pet();
  currentVisit: Visit = new Visit();
  previousVisits: Visit[] = [];

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router,
    private visitService: VisitService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.loadData();
    });
  }

  loadData() {
    this.currentVisit.visitDate = '2022-09-06T22:00:00.000+00:00';

    this.petId = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.petId);

    this.petService.getPet(this.petId).subscribe((pet) => {
      this.currentPet = pet;

      this.petService.getOwnerByPetId(this.petId).subscribe((owner) => {
        this.currentPet.owner = owner;
      });

      this.petService.getTypeByPetId(this.petId).subscribe((type) => {
        this.currentPet.type = type;
      });

      this.petService.getVisitByPetId(this.petId).subscribe((visits) => {
        this.previousVisits = visits;
        console.log(visits);
      });
    });
  }

  createVisit() {
    this.visitService.createService(this.generatePayload()).subscribe(
      (data) => {
        this.goToCurrentOwnerDetail();
      },
      (error) => console.log(error)
    );
  }

  goToCurrentOwnerDetail() {
    this.router.navigate([`/owners/${this.currentPet.owner.id}`]);
  }

  generatePayload() {
    return {
      visitDate: this.currentVisit.visitDate,
      description: this.currentVisit.description,
      pet: this.currentPet['_links'].self.href,
    };
  }

  onSubmit() {
    this.createVisit();
  }
}
