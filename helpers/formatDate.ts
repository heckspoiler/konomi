/** Formats an ISO date/timestamp as `dd.mm.yyyy`; empty string when missing. */
export const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
