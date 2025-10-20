import { type NextRequest, NextResponse } from "next/server";
import data from "@/lib/data/quote.json";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const author = searchParams.get("author");
  const random = searchParams.get("random");

  let filteredData = [...data];

  if (random) {
    const randomItem =
      filteredData[Math.floor(Math.random() * filteredData.length)];
    return NextResponse.json({ data: [randomItem], count: 1 });
  }

  if (author) {
    filteredData = filteredData.filter((q) =>
      q.author.toLowerCase().includes(author.toLowerCase()),
    );
  }

  if (search) {
    filteredData = filteredData.filter(
      (q) =>
        q.text.toLowerCase().includes(search.toLowerCase()) ||
        q.author.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (limit) {
    const limitNum = parseInt(limit, 10);
    if (!isNaN(limitNum) && limitNum > 0) {
      filteredData = filteredData.slice(0, limitNum);
    }
  }

  return NextResponse.json({ data: filteredData, count: filteredData.length });
}
