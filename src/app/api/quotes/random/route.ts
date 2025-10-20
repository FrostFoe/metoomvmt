import { NextResponse } from 'next/server';
import quotes from '@/lib/data/quotes.json';

export async function GET() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return NextResponse.json({ data: [randomQuote], count: 1 });
}
