import { usePathname } from 'next/navigation';

export function getPathSegments(numberOfSegments: number) {
  const path = usePathname();
  const pathSegments = path.split('/').filter(pathSegment => pathSegment);

  if (pathSegments.length < numberOfSegments) {
    console.log(`There are less than ${numberOfSegments} numberOfSegments. Full path was printed`)
    return pathSegments.join('/');
  }

  const segments = pathSegments.slice(-numberOfSegments).join('/');
  return segments;
}