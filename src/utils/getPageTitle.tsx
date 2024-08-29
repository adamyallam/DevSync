import { usePathname } from 'next/navigation'

// Gets title of current page
export function getPageTitle() {
  const path = usePathname()
  const segments = path.split('/').filter(segment => segment);

  const secondSegment = segments[1];
  return secondSegment.charAt(0).toUpperCase() + secondSegment.slice(1);
};