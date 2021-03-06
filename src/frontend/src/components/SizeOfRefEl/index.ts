import { useCallback, useEffect, useState } from "react";

export function useSizeOfRefEl(targetSizeRef: React.RefObject<HTMLElement>) {
  const [size, setSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  const updateSize = useCallback(() => {
    setSize((size) => {
      const width = targetSizeRef.current?.clientWidth;
      const height = targetSizeRef.current?.clientHeight;
      if (size.width === width && size.height === height) {
        return size;
      }
      return {
        width,
        height,
      };
    });
  }, [targetSizeRef]);

  useEffect(() => {
    updateSize();
  });

  useEffect(() => {
    const el = targetSizeRef.current;
    if (!el) return;
    el.addEventListener("loadeddata", updateSize);
    window.addEventListener("resize", updateSize);
    return () => {
      el.removeEventListener("loadeddata", updateSize);
      window.removeEventListener("resize", updateSize);
    };
  }, [updateSize, targetSizeRef]);

  return size;
}
