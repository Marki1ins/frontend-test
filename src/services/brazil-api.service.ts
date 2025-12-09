import axios from "axios";

export const getCpf = async (cpf: string) => {
  const url = import.meta.env.VITE_BRASIL_API_URL as string;

  try {
    const response = await axios.get(`${url}/ws/${cpf}/json`);
    const { data } = response;

    if (data.erro) {
      return { data: null, error: 'CPF não encontrado' };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};

export interface CpfData {
  data: {
    cep: string
    logradouro: string
    complemento: string
    unidade: string
    bairro: string
    localidade: string
    uf: string
    estado: string
    regiao: string
    ibge: string
    gia: string
    ddd: string
    siafi: string
  } | null;
  error: string | null;
}