export type CloseMenuProps = {
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
};

export const closeMenu = ({ setMenuIsOpen, time }: CloseMenuProps) => {
  setTimeout(() => setMenuIsOpen(false), time);
};
