import { useState, useEffect } from 'react';

const useResizable = (initialWidth) => {
  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialDivWidth, setInitialDivWidth] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        const newWidth = initialDivWidth + (startX - e.clientX);
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, initialDivWidth, startX]);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setInitialDivWidth(width);
  };

  return { width, isResizing, handleMouseDown };
};

export default useResizable;
