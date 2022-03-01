import { Component, OnInit } from '@angular/core';
import { Vet } from 'src/app/common/vet';
import { VetService } from 'src/app/services/vet.service';

@Component({
  selector: 'app-vet-list',
  templateUrl: './vet-list.component.html',
  styleUrls: ['./vet-list.component.css'],
})
export class VetListComponent implements OnInit {
  vets: Vet[] = [];

  constructor(private vetService: VetService) {}

  ngOnInit(): void {
    this.listVets();
  }

  listVets() {
    this.vetService.getVetList().subscribe((vets) => {
      this.vets = vets;

      this.vets.forEach((vet) => {
        this.vetService
          .getSpecialtiesByVetId(+vet.id)
          .subscribe((specialties) => {
            vet.specialties = specialties;
          });
      });
    });
  }
}
