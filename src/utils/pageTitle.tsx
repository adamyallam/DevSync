import { usePathname } from 'next/navigation'

// Gets title of current page
export function pageTitle() {
  const path = usePathname()
  const segments = path.split('/').filter(segment => segment);

  const lastSegment = segments[segments.length - 1];
  return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
};
