import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetas: any[] = [
    {titular: 'Juan Perez', numeroTarjeta: '98654324', fechaExpiracion:'11/23', cvv:'258'},
    {titular: 'Carlo Magna', numeroTarjeta: '125458965', fechaExpiracion:'05/22', cvv:'165'},
  ]

  form: FormGroup;

  constructor(private fb:FormBuilder, private toastr: ToastrService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['',[Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      fechaExpiracion: ['',[Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
  }

  //----------Funciones Agregadas----------
  agregarTarjeta(){
    // console.log(this.form);
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    // console.log(tarjeta);
    
    //Aca se realiza el push para cargar la 2da lista de la derecha listTarjeta
    this.listTarjetas.push(tarjeta);
    this.toastr.success('La Tarjeta fue registrada con exito.', 'Nueva Tarjeta');
    this.form.reset();
  }

  borrarTarjeta(index: number){
    this.listTarjetas.splice(index, 1);
    this.toastr.error('Se elimino tarjeta de la lista con exito.','Tarjeta Eliminada');
  }

}
