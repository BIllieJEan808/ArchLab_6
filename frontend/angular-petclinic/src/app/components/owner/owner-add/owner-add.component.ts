import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from 'src/app/common/owner';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owner-add',
  templateUrl: './owner-add.component.html',
  styleUrls: ['./owner-add.component.css'],
})
export class OwnerAddComponent implements OnInit {
  owner: Owner = new Owner();
  constructor(private ownerService: OwnerService, private router: Router) {}

  ngOnInit(): void {}

  createOwner() {
    this.ownerService.createOwner(this.owner).subscribe(
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
    this.createOwner();
  }
}
