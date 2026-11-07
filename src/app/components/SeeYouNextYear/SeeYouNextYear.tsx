import { EventDocument } from '@/prismicio-types';
import { nextEditionYear } from '@helpers/events';

type Props = {
  events: EventDocument[];
  as?: 'h1' | 'h2';
};

export default function SeeYouNextYear({ events, as: Heading = 'h2' }: Props) {
  return <Heading>Wir sehen uns im {nextEditionYear(events)}!</Heading>;
}
