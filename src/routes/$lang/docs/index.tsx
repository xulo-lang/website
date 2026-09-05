import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/$lang/docs/')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/$lang/docs/$',
      params: {
        lang: params.lang,
        _splat: 'introduction',
      },
    });
  },
});
