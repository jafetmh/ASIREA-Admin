import api from "@/utils/axios";
import { apiRoutes } from "../api_routes";

class PublicacionesService {
  async obtenerPublicaciones(categoriaId?: number) {
    const params = categoriaId ? { categoriaId } : {};
    const response = await api.get(apiRoutes.publicaciones, { params });
    return response.data;
  }

  async obtenerCategorias() {
    const response = await api.get(apiRoutes.publicaciones_categorias);
    return response.data;
  }

  async crearPublicacion(publicacion: FormData) {
    const response = await api.post(apiRoutes.publicaciones, publicacion);
    return response.data;
  }

  async actualizarPublicacion(id: string, publicacion: FormData) {
    const response = await api.put(`${apiRoutes.publicaciones}/${id}`, publicacion);
    return response.data;
  }

  async eliminarPublicacion(id: string) {
    const response = await api.delete(`${apiRoutes.publicaciones}/${id}`);
    return response.data;
  }
}

export default new PublicacionesService();
