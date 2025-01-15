import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider: React.FC = () => {
  return (
    <ToastContainer
      position="top-right" // Устанавливаем позицию в центре в верхней части
      autoClose={5000} // Авто-закрытие через 5 секунд
      hideProgressBar={false} // Показывать прогресс-бар
      newestOnTop={false} // Новые уведомления не перекрывают старые
      closeOnClick // Закрывать при клике
      draggable // Возможность перетаскивания
      pauseOnHover // Пауза при наведении
      style={{
        marginTop: '60px', // Добавляем отступ, чтобы сместить тосты ниже навбара
        zIndex: 9999, // Убедитесь, что уведомления выше других элементов
      }}
    />
  );
};

export default ToastProvider;
