import api from "@/utils/axios";
import { apiRoutes } from "../api_routes";

const ulrBaseJunta = apiRoutes.junta_directiva;
const urlInactivos = apiRoutes.junta_directiva_inactivos;

const getMembers = async () => {
   try {
    const response = await api.get(ulrBaseJunta);
    return response.data;
  } catch (error) {
      console.log(error);
      throw error;
  }
}

const getMembersInactivos = async () => {
  try {
    const response = await api.get(urlInactivos);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getMember = async (id: number) => {
    try {
      const response = await api.get(`${ulrBaseJunta}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const addMember = async (member: FormData) => {
    try {
      const response = await api.post(ulrBaseJunta, member);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const updateMember = async (id: number, member: FormData) => {
    try {
      const response = await api.put(`${ulrBaseJunta}/${id}`, member);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const deleteMember = async (id: number) => {
    try {
      const response = await api.delete(`${ulrBaseJunta}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  export { getMembers, getMembersInactivos, getMember, addMember, updateMember, deleteMember }
