export interface Categoria {
  id: number;
  nombre: string;
}

export interface Publication {
  id?: number;
  titulo: string;
  descripcion: string;
  categoria?: Categoria;
  imagenPortadaUrl?: string;
  fechaCreacion: string;
  importante?: boolean;
}

export interface Documento {
  id: number;
  nombre: string;
  url: string;
  fechaSubida: string;
}
