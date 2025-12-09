import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, expect, it } from 'vitest';

import { type CpfData, getCpf } from '../services/brazil-api.service';

describe("Busca de endereços por CEP", () => {
  const mock = new MockAdapter(axios);
  const baseUrl = import.meta.env.VITE_BRASIL_API_URL as string;

  it("Deve retornar os dados de endereço quando o CEP for válido", async () => {
    const mockCep = "01001-000";
    const mockResponse = {
      cep: "01001-000",
      logradouro: "Praça da Sé",
      complemento: "lado ímpar",
      bairro: "Sé",
      localidade: "São Paulo",
      uf: "SP",
      unidade: "",
      ibge: "3550308",
      gia: "1004",
      ddd: "11",
      siafi: "7107",
    };

    mock.onGet(`${baseUrl}/ws/${mockCep}/json`).reply(200, mockResponse);
    const result: CpfData = await getCpf(mockCep);

    expect(result.data).toEqual(mockResponse);
    expect(result.error).toBeNull();
  });

  it("Deve retornar erro quando o CEP não for encontrado", async () => {
    const mockCep = "99999-999";
    const mockResponse = { erro: true };

    mock.onGet(`${baseUrl}/ws/${mockCep}/json`).reply(200, mockResponse);
    const result: CpfData = await getCpf(mockCep);

    expect(result.data).toBeNull();
    expect(result.error).toBe("CPF não encontrado");
  });

  it("Deve retornar erro quando ocorrer uma falha na API", async () => {
    const mockCep = "00000-000";

    mock.onGet(`${baseUrl}/ws/${mockCep}/json`).reply(500);
    const result: CpfData = await getCpf(mockCep);

    expect(result.data).toBeNull();
    expect(result.error).toBe("Request failed with status code 500");
  });
});