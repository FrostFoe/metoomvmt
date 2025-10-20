import { type NextRequest, NextResponse } from 'next/server';
import quotes from '@/lib/data/quotes.json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const search = searchParams.get('search');
  const author = searchParams.get('author');

  let filteredQuotes = [...quotes];

  if (author) {
    filteredQuotes = filteredQuotes.filter(q => q.author.toLowerCase().includes(author.toLowerCase()));
  }

  if (search) {
    filteredQuotes = filteredQuotes.filter(q => 
      q.text.toLowerCase().includes(search.toLowerCase()) || 
      q.author.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (limit) {
    const limitNum = parseInt(limit, 10);
    if (!isNaN(limitNum) && limitNum > 0) {
      filteredQuotes = filteredQuotes.slice(0, limitNum);
    }
  }

  return NextResponse.json({ data: filteredQuotes, count: filteredQuotes.length });
}
