import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/common/owner';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css'],
})
export class OwnerEditComponent implements OnInit {
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
    });
  }

  updateOwner() {
    this.ownerService.updateOwner(this.ownerId, this.owner).subscribe(
      (data) => {
        this.goToOwnerList();
      },
      (error) => console.log(error)
    );
  }

  goToOwnerList() {
    this.router.navigate(['/owners']);
  }

  onSubmit() {
    this.updateOwner();
  }
}
