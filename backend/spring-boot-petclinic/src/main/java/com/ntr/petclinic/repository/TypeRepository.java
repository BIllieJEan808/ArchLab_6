package com.ntr.petclinic.repository;

import com.ntr.petclinic.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "types", itemResourceRel = "type", path = "types")
public interface TypeRepository extends JpaRepository<Type, Long> {
}
