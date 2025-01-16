import { useEffect, RefObject } from 'react';

export default function useMenuClose(menuRef: RefObject<HTMLDivElement>, buttonRef: RefObject<HTMLButtonElement>, menuOpenState: boolean, setMenuOpenState: (value: boolean) => void) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setMenuOpenState(false);
      }
    };
    if (menuOpenState) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpenState]);

}