import "./index.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { z } from "zod";

import PageTitle from "../../components/page-title";
import { getCpf, type CpfData } from "../../services/brazil-api.service.ts";

type CpfFormData = {
  cpf: string;
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [cpfData, setCpfData] = useState<CpfData | null>(null);

  const cpfSchema = z.object({
    cpf: z.string().min(8, "Informe um CPF válido"),
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CpfFormData>({
    resolver: zodResolver(cpfSchema),
  });

  const onSubmit = async (data: CpfFormData) => {
    setIsLoading(true);
    const result = await getCpf(data.cpf.replace(/[^\d]/g, ""));
    setCpfData(result);
    setIsLoading(false);
  };

  return (
    <div className="cpf-page">
      <PageTitle title="CPF" />
      <div className="cpf-container">
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div>
            <IMaskInput
              className="cpf-field"
              mask="00.000-000"
              onAccept={(value: string) =>
                setValue("cpf", value, { shouldValidate: true })
              }
              value={watch("cpf") || ""}
              placeholder="Digite seu CPF"
              required
            />
            {errors.cpf && <p className="cpf-error">{errors.cpf.message}</p>}
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {cpfData && cpfData.data && !cpfData.error && (
          <div style={{ marginTop: "1rem", color: "green" }}>
            <h4>Informações encontradas:</h4>
            <p>
              <strong>Logradouro:</strong> {cpfData.data.logradouro}
            </p>
            <p>
              <strong>Localidade:</strong> {cpfData.data.localidade}
            </p>
            <p>
              <strong>Estado:</strong> {cpfData.data.estado}
            </p>
          </div>
        )}

        {cpfData && cpfData.error && (
          <div style={{ marginTop: "1rem", color: "red" }}>
            <h4>Erro:</h4>
            <p>{cpfData.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;