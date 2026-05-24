import HomePage from './home-page';
import { useFallbackStore } from '@/lib/db';

export default function Page() {
  return <HomePage fallbackMode={useFallbackStore} />;
}
