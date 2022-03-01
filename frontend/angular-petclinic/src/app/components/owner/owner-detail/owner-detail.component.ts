import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/common/owner';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.css'],
})
export class OwnerDetailComponent implements OnInit {
  owner: Owner = new Owner();
  ownerId: number = 0;

  constructor(
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleOwnerDetails();
    });
  }

  handleOwnerDetails() {
    this.ownerId = +this.route.snapshot.paramMap.get('id')!;

    this.ownerService.getOwner(this.ownerId).subscribe((owner) => {
      this.owner = owner;
      this.ownerService.getPetsByOwnerId(this.ownerId).subscribe((pets) => {
        this.owner.pets = pets;
      });
    });
  }

  addPet() {
    this.router.navigate([`/owners/${this.ownerId}/pets/add`]);
  }
}
