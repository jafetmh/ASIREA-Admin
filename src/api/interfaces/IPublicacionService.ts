import type { Publication } from '@/interfaces/Publication';

export interface IPublicacionService {
  obtenerPublicaciones(): Promise<any>;
  obtenerPublicacionPorId(id: string): Promise<any>;
  crearPublicacion(publicacion: FormData): Promise<any>;
  actualizarPublicacion(id: string, publicacion: FormData): Promise<any>;
  eliminarPublicacion(id: string): Promise<any>;
}
