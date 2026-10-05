import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CharlaService, Charla, Asistente } from '../../services/charla.service';

export const validarRangoFechas: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const inicio = control.get('fechaInicio')?.value;
  const fin = control.get('fechaFin')?.value;
  if (inicio && fin) {
    const dInicio = new Date(inicio);
    const dFin = new Date(fin);
    if (dFin < dInicio) {
      return { fechasInvalidas: true };
    }
  }
  return null;
};

// Validador custom para edad > 18
export const mayorDeEdadValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const edad = control.value;
  if (edad !== null && edad <= 18) {
    return { menorDeEdad: true };
  }
  return null;
};

@Component({
  selector: 'app-charla-registro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './charla-registro.component.html',
  styleUrl: './charla-registro.component.css',
})
export class CharlaRegistroComponent implements OnInit {
  registroForm!: FormGroup;
  mensajeExito: string = '';
  charlas: Charla[] = [];
  
  private fb = inject(FormBuilder);
  private charlaService = inject(CharlaService);

  // Mapa para los formularios de asistentes de cada charla
  asistenteForms: { [key: number]: FormGroup } = {};

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      expositor: ['', Validators.required],
      nivel: ['Principiante', Validators.required],
      emailContacto: ['', [Validators.required, Validators.email]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      etiquetas: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    }, { validators: validarRangoFechas });

    this.cargarCharlas();
  }

  cargarCharlas() {
    this.charlaService.getCharlas().subscribe({
      next: (data) => {
        this.charlas = data;
        // Inicializar un formulario por cada charla
        this.charlas.forEach(c => {
          if (c.id && !this.asistenteForms[c.id]) {
            this.asistenteForms[c.id] = this.fb.group({
              nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
              correoElectronico: ['', [Validators.required, Validators.email]],
              edad: ['', [Validators.required, mayorDeEdadValidator]]
            });
          }
        });
      },
      error: (e) => console.error(e)
    });
  }

  get tituloCtrl() { return this.registroForm.get('titulo'); }
  get expositorCtrl() { return this.registroForm.get('expositor'); }
  get emailCtrl() { return this.registroForm.get('emailContacto'); }
  get etiquetasArray() { return this.registroForm.get('etiquetas') as FormArray; }

  agregarEtiqueta() {
    this.etiquetasArray.push(this.fb.control('', Validators.required));
  }

  removerEtiqueta(index: number) {
    if (this.etiquetasArray.length > 1) {
      this.etiquetasArray.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      this.charlaService.registrarCharla(this.registroForm.value).subscribe({
        next: (nuevaCharla) => {
          this.mensajeExito = '¡Charla registrada con éxito!';
          this.registroForm.reset({ nivel: 'Principiante' });
          this.etiquetasArray.clear();
          this.agregarEtiqueta(); // dejar al menos 1
          
          this.cargarCharlas();
          
          setTimeout(() => {
            this.mensajeExito = '';
          }, 3000);
        },
        error: (e) => console.error(e)
      });
    }
  }

  inscribirAsistente(charlaId: number) {
    const form = this.asistenteForms[charlaId];
    if (form && form.valid) {
      this.charlaService.registrarAsistente(charlaId, form.value).subscribe({
        next: (nuevoAsistente) => {
          form.reset();
          this.cargarCharlas(); // Refrescar para ver el asistente en la tarjeta
        },
        error: (e) => console.error(e)
      });
    }
  }
}
