import { QuoteApiClient } from '@/components/quote-api-client';
import { Documentation } from '@/components/documentation';
import { Features } from '@/components/features';

export default function Home() {
  return (
    <>
      <QuoteApiClient />
      <Documentation />
      <Features />
    </>
  );
}
