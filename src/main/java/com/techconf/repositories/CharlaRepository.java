package com.techconf.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techconf.models.Charla;

@Repository
public interface CharlaRepository extends JpaRepository<Charla, Long> {
}