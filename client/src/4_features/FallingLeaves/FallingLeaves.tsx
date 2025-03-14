import React, { useEffect, useRef } from 'react';
import './FallingLeaves.css';
import leaf1 from '/imgs/1.png';
import leaf2 from '/imgs/2.png';
import leaf3 from '/imgs/3.png';

const FallingLeaves: React.FC = () => {
  const leavesContainerRef = useRef<HTMLDivElement>(null);

  // Массив с путями к изображениям листьев
  const leafImages = [leaf1, leaf2, leaf3];

  useEffect(() => {
    const leavesContainer = leavesContainerRef.current;

    const createLeaf = (): void => {
      if (!leavesContainer) return;

      const leaf = document.createElement('div');
      leaf.classList.add('leaf');

      // Случайный выбор изображения листа
      const randomLeafImage = leafImages[Math.floor(Math.random() * leafImages.length)];
      leaf.style.backgroundImage = `url(${randomLeafImage})`;

      const size = Math.random() * 30 + 20; // Размер листа (от 20px до 50px)
      const delay = Math.random() * 5; // Задержка начала анимации
      const duration = Math.random() * 5 + 5; // Длительность анимации (от 5s до 10s)
      const startX = Math.random() * 100; // Начальная позиция по X

      leaf.style.width = `${String(size)}px`;
      leaf.style.height = `${String(size)}px`;
      leaf.style.left = `${String(startX)}%`;
      leaf.style.animationDelay = `${String(delay)}s`;
      leaf.style.animationDuration = `${String(duration)}s`;

      leavesContainer.appendChild(leaf);

      // Удаляем лист после завершения анимации
      leaf.addEventListener('animationend', () => {
        leaf.remove();
      });
    };

    const interval = setInterval(createLeaf, 500);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

  return <div ref={leavesContainerRef} className="leaves-container"></div>;
};

export default FallingLeaves;