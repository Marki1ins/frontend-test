import axios from "axios";

const url = import.meta.env.VITE_API_URL as string;

export const createNew = async (data: NewPayload) => {
  try {
    await axios.post(`${url}/noticias`, data);
    return { data: null, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export const getNews = async () => {
  try {
    const response = await axios.get(`${url}/noticias`);
    const { data } = response;

    if (!data) {
      return { data: null, error: "Nenhuma noticia encontrada" };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export const getNew = async (newsId: string) => {
  try {
    const response = await axios.get(`${url}/noticias/${newsId}`);
    const { data } = response;

    if (!data) {
      return { data: null, error: "Nenhuma noticia encontrada" };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export const editNew = async (newsId: string, data: NewPayload) => {
  try {
    await axios.put(`${url}/noticias/${newsId}`, data);
    return { data: null, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export const deleteNews = async (newsId: string) => {
  try {
    await axios.delete(`${url}/noticias/${newsId}`);
    return { data: null, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export interface News {
  data: NewData[] | null;
  error: string | null;
}

export interface New {
  data: NewData | null;
  error: string | null;
}

interface NewData {
  id: string;
  titulo: string;
  descricao: string;
}

interface NewPayload {
  titulo: string;
  descricao: string;
}