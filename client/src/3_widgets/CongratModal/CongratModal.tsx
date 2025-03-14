import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

type CongratModalProps = {
  open: boolean;
  onClose: () => void;
  points: number;
};

const CongratModal: React.FC<CongratModalProps> = ({ open, onClose, points }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {points > 0 ? 'Ура!' : 'Увы!'}
      </Typography>
      <Typography gutterBottom>
        {points > 0 ? `Правильный ответ! + ${String(points)} 💎` : 'Ответ неправильный 🤷!'}
      </Typography>
      <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
        Закрыть
      </Button>
    </Box>
  </Modal>
);

export default CongratModal;
