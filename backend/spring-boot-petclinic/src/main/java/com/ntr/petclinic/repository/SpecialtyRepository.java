package com.ntr.petclinic.repository;

import com.ntr.petclinic.entity.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "specialties", itemResourceRel = "specialty", path = "specialties")
public interface SpecialtyRepository extends JpaRepository<Specialty, Long> {
}
