export interface Categoria {
  id: number;
  nombre: string;
}

export interface Publication {
  id?: string;
  titulo: string;
  descripcion: string;
  categoria?: Categoria;
  imagenPortadaUrl?: string;
  documentoUrl?: string;
  fechaCreacion: string;
  importante?: boolean;
}
