import { KeyTextField } from '@prismicio/client';

export const truncateText = (
  text: string | KeyTextField,
  maxLength: number,
) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + '... ';
  }
  return text;
};
