import { notFound } from 'next/navigation';
import NotFoundComponent from '@/src/components/organisms/NotFoundComponent';

export default function NotFound() {
  return (
    <div className='flex items-center justify-center h-screen w-screen bg-fintown-bg'>
      <NotFoundComponent />
    </div>
  );
}
