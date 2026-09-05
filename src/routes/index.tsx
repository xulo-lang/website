import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RootIndex,
});

function RootIndex() {
  return <Navigate to="/$lang" params={{ lang: 'en' }} replace />;
}
