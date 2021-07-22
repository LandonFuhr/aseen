import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export const ErrorToast = ({
  isOpen,
  setIsOpen,
  action,
  errorMessage,
}: ErrorToastProps) => {
  const handleClose = (_event: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpen(false);
  };

  return (
    <Snackbar open={isOpen} onClose={handleClose}>
      <Alert severity="error" onClose={handleClose} action={action}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

interface ErrorToastProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: React.ReactNode;
  errorMessage: string;
}
