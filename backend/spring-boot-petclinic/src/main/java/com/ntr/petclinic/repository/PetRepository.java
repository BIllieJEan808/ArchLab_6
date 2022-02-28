package com.ntr.petclinic.repository;

import com.ntr.petclinic.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "pets", itemResourceRel = "pet", path = "pets")
public interface PetRepository extends JpaRepository<Pet, Long> {
}
