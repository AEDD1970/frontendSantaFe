import { ReactElement, ReactNode, Ref, forwardRef } from "react";
import { Box, Button, Dialog, Fade, FadeProps } from "@mui/material";

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

interface IModal {
  handleClose: () => void;
  handleSubmit: () => void;
  openModal: boolean;
  children: ReactNode;
}

export default function CustomModal({
  openModal,
  handleClose,
  children,
  handleSubmit
}: IModal) {
  return (
    <Dialog
      
      open={openModal}
      maxWidth="md"
      scroll="body"
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
    >
      {children}
      <Box display={"flex"} gap={2} margin={2}>
        <Button variant="contained" sx={{ mr: 1 }} onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Discard
        </Button>
      </Box>
    </Dialog>
  );
}
