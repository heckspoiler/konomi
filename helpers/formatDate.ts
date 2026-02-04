import { DateField } from '@prismicio/client';

export const formatDate = (dateString: string | DateField) => {
  const date = new Date(dateString as string);
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
