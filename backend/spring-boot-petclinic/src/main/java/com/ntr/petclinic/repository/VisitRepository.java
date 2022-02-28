package com.ntr.petclinic.repository;

import com.ntr.petclinic.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "visits", itemResourceRel = "visit", path = "visits")
public interface VisitRepository extends JpaRepository<Visit, Long> {
}
