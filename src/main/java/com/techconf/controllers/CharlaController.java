package com.techconf.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techconf.models.Charla;
import com.techconf.models.Asistente;
import com.techconf.repositories.CharlaRepository;
import com.techconf.repositories.AsistenteRepository;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/charlas")
@CrossOrigin(origins = "http://localhost:4200")
public class CharlaController {
    @Autowired
    private CharlaRepository repository;
    
    @Autowired
    private AsistenteRepository asistenteRepository;

    @GetMapping
    public List<Charla> obtenerTodas() {
        return repository.findAll();
    }

    @PostMapping
    public Charla registrarCharla(@RequestBody Charla nuevaCharla) {
        return repository.save(nuevaCharla);
    }

    @PostMapping("/{id}/asistentes")
    public Asistente registrarAsistente(@PathVariable Long id, @RequestBody Asistente nuevoAsistente) {
        Charla charla = repository.findById(id).orElseThrow(() -> new RuntimeException("Charla no encontrada"));
        nuevoAsistente.setCharla(charla);
        return asistenteRepository.save(nuevoAsistente);
    }
}
