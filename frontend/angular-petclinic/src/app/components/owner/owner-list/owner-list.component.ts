import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from 'src/app/common/owner';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css'],
})
export class OwnerListComponent implements OnInit {
  owners: Owner[] = [];

  constructor(private router: Router, private ownerService: OwnerService) {}

  ngOnInit(): void {
    this.listOwners();
  }

  listOwners() {
    this.ownerService.getOwnerList().subscribe((owners) => {
      this.owners = owners;

      this.owners.forEach((owner) => {
        this.ownerService.getPetsByOwnerId(+owner.id).subscribe((pets) => {
          owner.pets = pets;
        });
      });
    });
  }

  addOwner() {
    this.router.navigate(['/owners/add']);
  }
}
