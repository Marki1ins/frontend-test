import "./index.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createNew, editNew, getNew, type New } from "../../../../services/news-api.service";
import Modal from "../../../../components/modal";

type NewsPayload = {
  titulo: string;
  descricao: string;
};

function CreateOrEditNews({
  setCloseModal,
  newsId,
  setRefetch,
}: {
  setCloseModal: (value: boolean) => void;
  newsId: string | null;
  setRefetch: (value: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const newsSchema = z.object({
    titulo: z.string().min(3, "Informe um título válido"),
    descricao: z.string().min(3, "Informe uma descrição válida"),
  });

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<NewsPayload>({
    resolver: zodResolver(newsSchema),
  });

  useEffect(() => {
    const loadNew = async () => {
      setIsLoading(true);
      const news = (await getNew(newsId!)) as New;

      if (news.data) {
        setValue("titulo", news.data.titulo);
        setValue("descricao", news.data.descricao);
      }

      setIsLoading(false);
    };

    if (newsId) loadNew();
  }, [newsId]);

  const onSubmit = async (data: NewsPayload) => {
    setIsLoading(true);
    if (newsId) {
      await editNew(newsId, data);
    } else {
      await createNew(data);
    }
    setCloseModal(false);
    setIsLoading(false);
    setRefetch(true);
  };

  return (
    <Modal setCloseModal={setCloseModal}>
      <div>
        <h3>{newsId ? "Editar noticia" : "Criar noticia"}</h3>
        <form
          className="news-form"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div>
            <input
              type="text"
              {...register("titulo")}
              placeholder="Título"
              disabled={isLoading}
            />
            {errors.titulo && <span>{errors.titulo.message}</span>}
          </div>
          <div>
            <textarea
              rows={5}
              {...register("descricao")}
              placeholder="Descrição"
              disabled={isLoading}
            />
            {errors.descricao && <span>{errors.descricao.message}</span>}
          </div>
          <button type="submit" disabled={isLoading}>
            {newsId ? "Editar" : "Criar"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default CreateOrEditNews;