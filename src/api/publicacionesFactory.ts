import type { IPublicacionService } from "./interfaces/IPublicacionService";
import NoticiasService from "./services/NoticiasService";
import ProyectosService from "./services/ProyectosService";
import InformesService from "./services/InformesService";
import FichasTecnicasService from "./services/FichasTecnicasService";

export type CategoriaPublicacion = "Noticia" | "Proyecto" | "Informe" | "Ficha Tecnica";

class PublicacionesFactory {
  private serviceMap: Record<CategoriaPublicacion, IPublicacionService>;

  constructor() {
    this.serviceMap = {
      "Noticia": NoticiasService,
      "Proyecto": ProyectosService,
      "Informe": InformesService,
      "Ficha Tecnica": FichasTecnicasService,
    };
  }

  getService(categoria: CategoriaPublicacion): IPublicacionService {
    const service = this.serviceMap[categoria];

    if (!service) {
      throw new Error(`No existe servicio para la categoría: ${categoria}`);
    }

    return service;
  }

  // Método helper para obtener todas las categorías disponibles
  getCategorias(): CategoriaPublicacion[] {
    return Object.keys(this.serviceMap) as CategoriaPublicacion[];
  }
}

export default new PublicacionesFactory();
