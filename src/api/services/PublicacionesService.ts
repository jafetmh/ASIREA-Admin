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

  async obtenerPublicacion(id: number) {
    const response = await api.get(`${apiRoutes.publicaciones}/${id}`);
    return response.data;
  }

  async crearPublicacion(publicacion: FormData) {
    const response = await api.post(apiRoutes.publicaciones, publicacion);
    return response.data;
  }

  async actualizarPublicacion(id: number, publicacion: FormData) {
    const response = await api.put(`${apiRoutes.publicaciones}/${id}`, publicacion);
    return response.data;
  }

  async eliminarPublicacion(id: number) {
    const response = await api.delete(`${apiRoutes.publicaciones}/${id}`);
    return response.data;
  }

  async obtenerDocumentos(publicacionId: number) {
    const response = await api.get(`${apiRoutes.publicaciones}/${publicacionId}/documentos`);
    return response.data;
  }

  async subirDocumento(publicacionId: number, formData: FormData) {
    const response = await api.post(`${apiRoutes.publicaciones}/${publicacionId}/documentos`, formData);
    return response.data;
  }

  async eliminarDocumento(publicacionId: number, documentoId: number) {
    const response = await api.delete(`${apiRoutes.publicaciones}/${publicacionId}/documentos/${documentoId}`);
    return response.data;
  }
}

export default new PublicacionesService();
