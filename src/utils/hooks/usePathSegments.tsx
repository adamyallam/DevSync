import { usePathname } from 'next/navigation';

//Takes a number and returns that number of path segments starting from right to left

export function usePathSegments(numberOfSegments: number) {
  const path = usePathname();
  const pathSegments = path.split('/').filter(pathSegment => pathSegment);

  if (pathSegments.length < numberOfSegments) {
    console.log(`There are less than ${numberOfSegments} numberOfSegments. Full path was printed`)
    return pathSegments.join('/');
  }

  const segments = pathSegments.slice(-numberOfSegments).join('/');
  return segments;
}