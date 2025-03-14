import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({ open, onClose, onConfirm }: DeleteConfirmationModalProps): React.JSX.Element {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Удаление аккаунта"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Вы уверены, что хотите удалить ваш аккаунт? Это действие необратимо.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}