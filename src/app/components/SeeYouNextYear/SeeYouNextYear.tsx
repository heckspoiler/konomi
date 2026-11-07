type Props = {
  year: number;
  as?: 'h1' | 'h2';
};

/** Shown when there are no upcoming events. `year` comes from getEventLists. */
export default function SeeYouNextYear({ year, as: Heading = 'h2' }: Props) {
  return <Heading>Wir sehen uns im {year}!</Heading>;
}
