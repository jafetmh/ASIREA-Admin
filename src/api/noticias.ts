import api from "@/utils/axios";
import { apiRoutes } from "./api_routes";

const obtenerNoticias = async () => {
  try {
    const response = await api.get(apiRoutes.noticias);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const obtenerNoticiaPorId = async (id: string) => {
  try {
    const response = await api.get(`${apiRoutes.noticias}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const crearNoticia = async (noticia: FormData) => {
  try {
    const response = await api.post(apiRoutes.noticias, noticia);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const actualizarNoticia = async (id: string, noticia: FormData) => {
  try {
    const response = await api.put(`${apiRoutes.noticias}/${id}`, noticia);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminarNoticia = async (id: string) => {
  try {
    const response = await api.delete(`${apiRoutes.noticias}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const noticiasService = {
  obtenerNoticias,
  obtenerNoticiaPorId,
  crearNoticia,
  actualizarNoticia,
  eliminarNoticia,
};
