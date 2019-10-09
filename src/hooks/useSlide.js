import { useEffect, useState } from 'react';

function useSlide() {
  const [slide, setSlide] = useState({ old: null, current: null });
  const [tmpSlide, setTmpSlide] = useState(null);

  useEffect(() => {
    tmpSlide && setSlide({ old: slide.current, current: tmpSlide });
  }, [tmpSlide]);

  return [slide.current, setTmpSlide, slide.old];
}

export default useSlide;
