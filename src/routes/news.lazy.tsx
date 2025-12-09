import { createLazyFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const ListNews = lazy(() => import("../modules/news/list"));

export const Route = createLazyFileRoute("/news")({
  component: () => (
    <Suspense fallback={<p>Carregando módulo de notícias...</p>}>
      <ListNews />
    </Suspense>
  ),
});
