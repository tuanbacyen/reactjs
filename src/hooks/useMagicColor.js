import { useEffect, useRef, useState } from "react";

function getRandomColor(currentColor) {
  let COLOR_LIST = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
    'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
    'silver', 'teal', 'white', 'yellow', 'transparent'];

  const currentIndex = COLOR_LIST.indexOf(currentColor);

  let newIndex = currentIndex;

  while (currentIndex === newIndex) {
    newIndex = Math.trunc(Math.random() * COLOR_LIST.length);
  }

  return COLOR_LIST[newIndex];
}

function useMagicColor() {
  const [color, setColor] = useState('transparent');
  const colorRef = useRef('transparent');

  useEffect(() => {
    const colorInterval = setInterval(() => {
      const newColor = getRandomColor(colorRef.current);

      setColor(newColor);
      colorRef.current = newColor;
    }, 1000);

    return (() => {
      clearInterval(colorInterval);
    });
  }, [])

  return color;
}

export default useMagicColor;
