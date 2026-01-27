import api from "@/utils/axios";
import { apiRoutes } from "../api_routes";

const urlBaseAdministrativo = apiRoutes.administrativo;
const urlInactivos = apiRoutes.administrativo_inactivos;

const getPersonalList = async () => {
  try {
    const response = await api.get(urlBaseAdministrativo);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPersonalInactivos = async () => {
  try {
    const response = await api.get(urlInactivos);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPersonal = async (id: number) => {
  try {
    const response = await api.get(`${urlBaseAdministrativo}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addPersonal = async (personal: FormData) => {
  try {
    const response = await api.post(urlBaseAdministrativo, personal);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updatePersonal = async (id: number, personal: FormData) => {
  try {
    const response = await api.put(`${urlBaseAdministrativo}/${id}`, personal);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletePersonal = async (id: number) => {
  try {
    const response = await api.delete(`${urlBaseAdministrativo}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getPersonalList, getPersonalInactivos, getPersonal, addPersonal, updatePersonal, deletePersonal };
