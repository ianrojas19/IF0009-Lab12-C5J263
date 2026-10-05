import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CharlaService, Charla } from '../../services/charla.service';
@Component({
  selector: 'app-charla-registro',
  standalone: true,
  // ¡IMPORTANTE! Se debe importar ReactiveFormsModule para activar Reactive Forms
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './charla-registro.component.html',
  styleUrl: './charla-registro.component.css'
})
export class CharlaRegistroComponent implements OnInit {
  private charlaService = inject(CharlaService);
  charlas: Charla[] = [];
  mensajeExito: string = '';
  // 1. Definición de la estructura y validadores del formulario reactivo
  registroForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(5)]),
    expositor: new FormControl('', [Validators.required]),
    nivel: new FormControl('Principiante', [Validators.required]),
    emailContacto: new FormControl('', [Validators.required, Validators.email])
  });
  ngOnInit(): void {
    this.cargarCharlas();
  }
  cargarCharlas() {
    this.charlaService.getCharlas().subscribe({
      next: (data) => this.charlas = data,
      error: (err) => console.error("Error al cargar las charlas", err)
    });
  }
  // 2. Método de envío
  onSubmit(): void {
    // Si el formulario es inválido, forzamos a mostrar los errores visualmente
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }
    // Extraemos los valores ya tipados y validados del formulario
    const nuevaCharla: Charla = this.registroForm.value as Charla;
    this.charlaService.registrarCharla(nuevaCharla).subscribe({
      next: (res) => {
        this.mensajeExito = '¡Charla registrada exitosamente!';
        this.charlas.push(res);
        // Resetea el formulario dejándolo en estado prístino
        this.registroForm.reset({ nivel: 'Principiante' });
      },
      error: (err) => console.error(err)
    });
  }
  // Getters auxiliares para facilitar el acceso en la vista HTML
  get tituloCtrl() { return this.registroForm.get('titulo'); }
  get expositorCtrl() { return this.registroForm.get('expositor'); }
  get emailCtrl() { return this.registroForm.get('emailContacto'); }
}
