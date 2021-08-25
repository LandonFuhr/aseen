import { HomeRounded } from "@material-ui/icons";
import { OutlineButton } from "../../components/Buttons";

export const HomeButton = ({ onClick }: HomeButtonProps) => {
  return (
    <OutlineButton text="Back Home" icon={<HomeRounded />} onClick={onClick} />
  );
};

interface HomeButtonProps {
  onClick: () => void;
}
