import { createLazyFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import { ProtectedRoute } from '../components/auth/ProtectedRoute';

const ListNews = lazy(() => import("../modules/news/list"));

export const Route = createLazyFileRoute("/news")({
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<p>Carregando módulo de notícias...</p>}>
        <ListNews />
      </Suspense>
    </ProtectedRoute>
  ),
});
