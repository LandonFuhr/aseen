import { HelpOutline, FolderOpenOutlined } from "@material-ui/icons";
import { OutlineButton } from "../../../components/Buttons";
import { openExternalLink } from "../../../core/electron/shell";

export const SavedResultsButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <OutlineButton
      onClick={onClick}
      text="Saved Results"
      icon={<FolderOpenOutlined />}
    />
  );
};

export const HelpAndDocsButton = () => {
  return (
    <OutlineButton
      onClick={() =>
        openExternalLink("https://github.com/LandonFuhr/aseen/wiki")
      }
      text="Help and Documentation"
      icon={<HelpOutline />}
    />
  );
};

export const GithubButton = () => {
  return (
    <OutlineButton
      onClick={() => openExternalLink("https://github.com/LandonFuhr/aseen")}
      text="Source Code"
      icon={
        <img className="github-icon" src="github_logo.png" alt="Github Logo" />
      }
    />
  );
};
