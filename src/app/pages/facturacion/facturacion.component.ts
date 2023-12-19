import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { DetalleVenta } from 'src/app/interfaces/venta';
import { MetPagoService } from 'src/app/services/met-pago.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['../../shared/sass/main.scss']
})
export class FacturacionComponent {
  iduseruser: string = '';
  empresaNombre: string = '';
  met_pagos: any[] = []; 
  products: any[] = [];
  selectedProduct: any = [];
  selectedProductName: string = '';

  cantidadModel: number = 0;

  // fac form
  igv: number = 0.18;
  priceigv: number = 0;
  pricevv: number = 0;
  pricecsigv: number = 0;
  total: number = 0;
  percep: number = 0;
  price: number = 0;

  cadpriceigv: string = "";
  cadpricevv: string = "";
  cadpricecsigv: string = "";
  cadtotal: string = "";
  cadpercep: string = "";
  cadprice: string = "";

  // datos
  idcliente: number = 1;
  iduser: number = 0;

  description: string = "";

  // Para productos 
  productosSeleccionados: DetalleVenta[] = [];

  //token
  decodedToken: any;

  // datos cliente
  idtype_doc: number = 1;
  categoria: string = "";
  deuda: number = 0;
  fac_por_cobrar: number = 0;
  direccion: string = "";
  haber: string = "";
  efectivo_eq: number = 0;
  cheque: string = "";

  // datos venta
  idmet_pago: number = 1;
  forma_pago: string = "";
  documento: string = "";
  numero_doc: string = "";
  tipo_moneda: string = "";
  tipo_cambio: string = "";
  monto_total: number = 0;

  constructor(private route: ActivatedRoute, 
    private met_pagoService: MetPagoService, 
    private userService: UserService,
    private productService: ProductService,
    private jwtHelper: JwtHelperService,
    private _clienteService: ClienteService,
    private _errorService: ErrorService,
    private _ventaService: VentaService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.iduseruser = params['id'];
      // Aquí puedes usar this.id como el ID de la empresa seleccionada
      this.userService.getUserNameById(this.iduseruser).subscribe((response: any) => {
        this.empresaNombre = response.userName;
        // Aquí puedes usar this.empresaNombre como el nombre de la empresa seleccionada
      });
    });

    this.met_pagoService.getMetPago().subscribe((data: any) => {
      this.met_pagos = data; // Asigna los datos obtenidos a la variable empresas
    });

    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    })

    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
    } else {
      console.error('El token no está presente en el almacenamiento local.');
    }

  }

  onProductSelected() {
    // Buscar el producto seleccionado en la lista de productos
    this.selectedProduct = this.products.find(product => product.name === this.selectedProductName);
    if (this.selectedProduct) {
      this.onCantidadChange();
    }
  }
  

  onCantidadChange () {
    this.priceigv = Math.round((this.selectedProduct.price*this.igv)*this.cantidadModel*100)/100;
    this.pricevv = Math.round(this.selectedProduct.price*this.cantidadModel*100)/100;
    this.pricecsigv = Math.round((this.selectedProduct.price-this.selectedProduct.price*this.igv)*this.cantidadModel*100)/100;
    this.total = Math.round(this.selectedProduct.price*this.cantidadModel*100)/100;
    this.percep = Math.round(0.01*(this.total)*100)/100;
    this.price = Math.round(this.selectedProduct.price*100)/100;
    this.cadpriceigv = this.priceigv.toFixed(2);
    this.cadpricevv = this.pricevv.toFixed(2);
    this.cadpricecsigv = this.pricecsigv.toFixed(2);
    this.cadtotal = this.total.toFixed(2);
    this.cadpercep = this.percep.toFixed(2);
    this.cadprice = this.price.toFixed(2);
  }

  agregarFila() {
    this.agregarCliente();
    if (this.selectedProduct && this.cantidadModel > 0) {
      // Agregar el producto a la lista de productos seleccionados
      const productoSeleccionado: DetalleVenta = {
        idcliente: this.idcliente,
        iduser: this.decodedToken.iduser,
        idproducto: this.selectedProduct.idproducto,
        producto: this.selectedProduct.name,
        price: this.selectedProduct.price,
        cantidad: this.cantidadModel,
        percep: this.percep,
        vv: this.pricevv,
        igv: this.priceigv,
        total_par: this.total,
        cuenta: 0,
        csigv: this.pricecsigv,
        descripcion: this.description,
      };
  
      this.productosSeleccionados.push(productoSeleccionado);
  
      // Limpiar campos después de agregar
      this.selectedProduct = null;
      this.selectedProductName = '';
      this.cantidadModel = 0;
    }
    
  }

  actualizarVenta() {
    // Aquí colocarías la lógica para procesar y guardar la venta con los detalles
    // Por ejemplo, puedes llamar a un servicio que se encargue de la comunicación con el backend
  
    // Luego, puedes limpiar la lista de productos seleccionados
    // this.productosSeleccionados = [];

  }

  agregarVenta() {
    // Construir objeto con los datos de la venta
    
    
    const nuevaVenta = {
      idmet_pago: this.idmet_pago,
      forma_pago: this.forma_pago,
      documento: this.documento,
      numero_doc: this.numero_doc,
      tipo_moneda: this.tipo_moneda,
      tipo_cambio: this.tipo_cambio,
      monto_total: this.monto_total,
      detalles: this.productosSeleccionados
    };
    console.log(nuevaVenta);
  
    // Realizar la solicitud al servicio de venta para agregar la nueva venta
    this._ventaService.addVenta(nuevaVenta).subscribe({
      next: (v) => {
        console.log('Venta agregada correctamente', v);
        this.productosSeleccionados = [];
      },
      error: (e) => {
        this._errorService.msgError(e)
      }
    });
  }

  agregarCliente () {
    const cliente: Cliente = {
      idtype_doc: this.idtype_doc, // Asigna el valor adecuado para idtype_doc
      categoria: this.categoria, // Asigna el valor adecuado para categoria
      deuda: this.deuda, // Asigna el valor adecuado para deuda
      fac_por_cobrar: this.fac_por_cobrar, // Asigna el valor adecuado para fac_por_cobrar
      direccion: this.direccion, // Asigna el valor adecuado para direccion
      haber: this.haber, // Asigna el valor adecuado para haber
      efectivo_eq: this.efectivo_eq, // Asigna el valor adecuado para efectivo_eq
      cheque: this.cheque, // Asigna el valor adecuado para cheque
    };

    this._clienteService.addCliente(cliente).subscribe({
      next: (v) => {
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msgError(e)
      },
      complete: () => console.info('complete')
    })

  }
  

}
