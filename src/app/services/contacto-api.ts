import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { __param } from 'tslib';



// molde para los datos que envia el usuario al formulario
export type ContactPayload = {
    nombre: string;
    correo: string;
    confirmarCorreo: string;
    mensaje: string;
    respuesta: string;
  }

  //Molde para la lista de errores
export type ApiFieldErrors = Record<string, string>;


//molde para la respuesta del servidor(API)
export type ApiResponseOk = {
  ok: true;
  message: string;
}

export type ApiResponseFail = {
  ok: false;
  message: string;
  fieldErrors: ApiFieldErrors;
}

export type ApiResponse = ApiResponseOk | ApiResponseFail;
@Injectable({
  providedIn: 'root',
})


export class ContactoApi {
  private emailsUsados = new Set<string>([
    'test@correo.com',
    'demo@utcv.edu.mx'
  ]);  

private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

submit(payload: ContactPayload): Observable<ApiResponse>{
  console.log('[API] submit() payload recibido:', payload );
  
  const errors: ApiFieldErrors={};
//limpiamos los datos
  const nombre = (payload.nombre ?? '').trim();
  const correo = (payload.correo ?? '').trim().toLowerCase();
  const confirmarCorreo = (payload.confirmarCorreo ?? '').trim().toLowerCase();
  const mensaje = (payload.mensaje ?? '').trim();
  const respuesta = (payload.respuesta ?? '').trim();
//reglas de negocio

// a)campos obligatorios
if (!nombre) errors ['nombre'] = 'El nombre es obligatorio (BackEnd).';
if (!correo) errors ['correo'] = 'El correo es obligatorio (BackEnd).';
if (!confirmarCorreo) errors ['confirmarCorreo'] = 'Confirma tu correo (BackEnd).';
if (!mensaje) errors ['mensaje'] = 'El mensaje es obligatorio (BackEnd).';
if (!respuesta) errors ['respuesta'] = 'La verificación humana es obligatoria (BackEnd).';

// b) formato de correo
if (correo && !this.emailRegex.test(correo)) {
  errors['correo'] = 'Formato de correo inválido (BackEnd).';
}

if (confirmarCorreo && !this.emailRegex.test(confirmarCorreo)) {
  errors['confirmarCorreo'] = 'Formato de correo inválido (BackEnd).';
}


// c) Coherencia (los errores deben ser iguales)
if (correo && confirmarCorreo && correo !== confirmarCorreo) {
  errors['confirmarCorreo'] = 'Los errores no coinciden (BackEnd).';
}

//d) longitud del mensaje
if (mensaje) {
  if (mensaje.length < 10 ) errors['mensaje'] = 'El mensaje debe tener al menos 10 caracteres (BackEnd)';
  if (mensaje.length > 500 ) errors['mensaje'] = 'El mensaje no debe superar 500 caracteres (BackEnd)';
}

// e) dato unico
if (correo && this.emailsUsados.has(correo)) {
  errors['correo'] = 'Este correo ya fue utilizado (BackEnd)';
}

// f) verificacion humana
if (respuesta && respuesta !== '7') {
  errors['respuesta'] = 'Verificación humana incorrecta (BackEnd).';
}

//RESPUESTA
//
if(Object.keys(errors).length > 0) {
  const fail: ApiResponseFail = {
    ok: false,
    message: 'No se pudo enviar. Revisa los campos marcados.',
    fieldErrors: errors,
  };

  console.log('[API] Respuesta FAIL:', fail);
  return of(fail).pipe(delay(400));
}

// si todo esta bien
this.emailsUsados.add(correo);

const ok: ApiResponseOk = {
  ok: true,
  message: 'Mensaje enviado correctamente (BackEnd).',
};

console.log('[API] Respuesta OK:', ok);
return of(ok).pipe(delay(400));
}


}