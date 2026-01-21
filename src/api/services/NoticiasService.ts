import api from "@/utils/axios";
import { apiRoutes } from "../api_routes";
import type { IPublicacionService } from "../interfaces/IPublicacionService";

class NoticiasService implements IPublicacionService {
  private readonly baseUrl = apiRoutes.noticias;

  async obtenerPublicaciones() {
    try {
      const response = await api.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async obtenerPublicacionPorId(id: string) {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async crearPublicacion(publicacion: FormData) {
    try {
      const response = await api.post(this.baseUrl, publicacion);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async actualizarPublicacion(id: string, publicacion: FormData) {
    try {
      const response = await api.put(`${this.baseUrl}/${id}`, publicacion);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async eliminarPublicacion(id: string) {
    try {
      const response = await api.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new NoticiasService();
