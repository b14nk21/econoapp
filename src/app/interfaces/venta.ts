export interface Venta {
    idventa?: number;
    idmet_pago: number;
    forma_pago: string;
    documento: string;
    numero_doc: string;
    tipo_moneda: string;
    tipo_cambio: string;
    monto_total: number;
    detalles: DetalleVenta[];
}

export interface DetalleVenta {
    idcliente: number;
    iduser: number;
    idproducto: number;
    producto: Producto[];
    price: number;
    cantidad: number;
    percep: number;
    vv: number;
    igv: number;
    total_par: number;
    cuenta: number;
    csigv: number;
    descripcion: string;
}

export interface Producto {
    idproducto: number;
    name: string;
}
