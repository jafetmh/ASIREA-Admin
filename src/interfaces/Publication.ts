import type { CategoriaPublicacion } from '@/api/publicacionesFactory';

export interface Publication {
  id?: string;
  titulo: string;
  descripcion: string;
  categoria?: CategoriaPublicacion;
  imagenUrl?: string;
  documentoUrl?: string;
  fechaCreacion: string;
}
