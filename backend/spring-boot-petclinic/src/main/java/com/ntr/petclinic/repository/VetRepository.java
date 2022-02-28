package com.ntr.petclinic.repository;

import com.ntr.petclinic.entity.Vet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "vets", itemResourceRel = "vet", path = "vets")
public interface VetRepository extends JpaRepository<Vet, Long> {
}
