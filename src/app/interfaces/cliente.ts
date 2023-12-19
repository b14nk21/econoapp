export interface Cliente {
    idtype_doc: number;
    categoria: string;
    deuda: number | null;
    fac_por_cobrar: number;
    direccion: string | null;
    haber: string | null;
    efectivo_eq: number | null;
    cheque: string | null;
  }