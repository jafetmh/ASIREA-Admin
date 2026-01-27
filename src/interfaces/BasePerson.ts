export interface BasePerson {
  id?: number;
  foto?: string;
  nombre: string;
  ocupacion?: string;
  puesto: string;
  fechaRegistro: string;
  fechaInactivo?: string;
  activo: boolean;
}
