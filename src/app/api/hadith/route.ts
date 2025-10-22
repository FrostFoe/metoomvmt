import { type NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Function to get the path to the hadith data directory
const getHadithDataPath = () => {
  return path.join(process.cwd(), "src", "lib", "data", "hadith");
};

const prettyJsonResponse = (data: any, status: number = 200) => {
  return new NextResponse(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

// GET all hadiths, or a random hadith
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const author = searchParams.get("author");
  const random = searchParams.get("random");

  const hadithDir = getHadithDataPath();

  try {
    const files = await fs.readdir(hadithDir);
    const hadithFiles = files.filter((file) => file.endsWith(".json"));

    let allHadiths: any[] = [];
    for (const file of hadithFiles) {
      const filePath = path.join(hadithDir, file);
      const fileContent = await fs.readFile(filePath, "utf8");
      // If file is empty, JSON.parse will throw an error.
      if (fileContent) {
        const hadithData = JSON.parse(fileContent);
        allHadiths = allHadiths.concat(hadithData);
      }
    }

    if (random) {
      if (allHadiths.length === 0) {
        return prettyJsonResponse({ error: "No hadiths found" }, 404);
      }
      const randomItem =
        allHadiths[Math.floor(Math.random() * allHadiths.length)];
      return prettyJsonResponse({ data: [randomItem], count: 1 });
    }

    if (author) {
      allHadiths = allHadiths.filter((q) =>
        q.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    if (search) {
      allHadiths = allHadiths.filter(
        (q) =>
          q.text.toLowerCase().includes(search.toLowerCase()) ||
          q.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        allHadiths = allHadiths.slice(0, limitNum);
      }
    }

    return prettyJsonResponse({ data: allHadiths, count: allHadiths.length });
  } catch (error) {
     if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        // This can happen if the directory doesn't exist or if hadith.json was deleted and the new dir structure is not yet in place.
        // Return an empty array as if there are no hadiths.
        return prettyJsonResponse({ data: [], count: 0 });
    }
    return prettyJsonResponse(
      {
        error: `Failed to process request: ${(error as Error).message}`,
      },
      500
    );
  }
}
