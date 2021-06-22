import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent  implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    genero: [ 'F', Validators.required ],
    notificaciones: [true],
    terminos: [ false, Validators.requiredTrue]
  });

  persona = {
    genero: 'M',
    notificaciones: false
    }

  constructor( private fb: FormBuilder) { }


  ngOnInit(): void {
    this.miFormulario.reset( {
      ...this.persona,
      terminos: false
    });

    this.miFormulario.valueChanges.subscribe( ({ terminos, ...restoDeArgumento}) => {
      //delete form.terminos;
      this.persona = restoDeArgumento;
    })
  }

  guardar(){

    const formValue = { ...this.miFormulario.value};
    delete formValue.terminos;

    this.persona = formValue;


    console.log(formValue)

  }





}
