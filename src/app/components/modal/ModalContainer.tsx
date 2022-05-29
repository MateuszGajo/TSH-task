import { Box, IconButton, Modal } from "@mui/material";
import { useModalStore } from "app/providers/RootStoreProvider";
import { observer } from "mobx-react-lite";
import CloseIcon from "@mui/icons-material/Close";

export default observer(function ModalContainer() {
  const { closeModal, modal } = useModalStore();

  return (
    <Modal
      open={modal.open}
      onClose={closeModal}
      aria-labelledby="modal"
      aria-describedby="modal"
    >
      <Box
        position="absolute"
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <IconButton
          sx={(theme) => ({
            position: "absolute",
            top: "8px",
            right: "8px",
            zIndex: 2,
            color: theme.myColor.black.main,
          })}
          onClick={closeModal}
          data-testid="modal__product"
        >
          <CloseIcon sx={{ fontSize: "26px" }} />
        </IconButton>
        {modal.body}
      </Box>
    </Modal>
  );
});
