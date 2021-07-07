import {
  FolderOutlined,
  HelpOutline,
  SchoolOutlined,
} from "@material-ui/icons";
import { OutlineButton } from "../../../components/Buttons";

export const SavedResultsButton = (props: ButtonBarButtonProps) => {
  return (
    <OutlineButton
      onClick={props.onClick}
      text="Saved Results"
      icon={<FolderOutlined />}
    />
  );
};

export const HelpAndDocsButton = (props: ButtonBarButtonProps) => {
  return (
    <OutlineButton
      onClick={props.onClick}
      text="Help and Documentation"
      icon={<HelpOutline />}
    />
  );
};

export const DemoButton = (props: ButtonBarButtonProps) => {
  return (
    <OutlineButton
      onClick={props.onClick}
      text="Demo"
      icon={<SchoolOutlined />}
    />
  );
};

export const GithubButton = (props: ButtonBarButtonProps) => {
  return (
    <OutlineButton
      onClick={props.onClick}
      text="Source Code"
      icon={
        <img
          className="github-icon"
          src="GitHub-Mark-120px-plus.png"
          alt="Github Logo"
        />
      }
    />
  );
};

interface ButtonBarButtonProps {
  onClick: () => void;
}
