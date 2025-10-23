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

// Cache hadiths in memory
let allHadiths: any[] | null = null;

async function loadHadiths() {
  if (allHadiths !== null) {
    return allHadiths;
  }

  const hadithDir = getHadithDataPath();
  try {
    const files = await fs.readdir(hadithDir);
    const hadithFiles = files.filter((file) => file.endsWith(".json"));

    const loadedHadiths: any[] = [];
    for (const file of hadithFiles) {
      const filePath = path.join(hadithDir, file);
      const fileContent = await fs.readFile(filePath, "utf8");
      if (fileContent) {
        const hadithData = JSON.parse(fileContent);
        loadedHadiths.push(...hadithData);
      }
    }
    allHadiths = loadedHadiths;
    return allHadiths;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      allHadiths = [];
      return allHadiths;
    }
    console.error("Failed to load hadiths:", error);
    allHadiths = []; // Cache empty array on error
    return allHadiths;
  }
}

// Preload hadiths on server start
loadHadiths();

// GET all hadiths, or a random hadith
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const author = searchParams.get("author");
  const random = searchParams.get("random");

  try {
    let hadiths = await loadHadiths();

    if (hadiths.length === 0) {
      return prettyJsonResponse({ data: [], count: 0 });
    }

    if (random) {
      const randomItem = hadiths[Math.floor(Math.random() * hadiths.length)];
      return prettyJsonResponse({ data: [randomItem], count: 1 });
    }

    let filteredHadiths = [...hadiths];

    if (author) {
      filteredHadiths = filteredHadiths.filter((q) =>
        q.author.toLowerCase().includes(author.toLowerCase()),
      );
    }

    if (search) {
      filteredHadiths = filteredHadiths.filter(
        (q) =>
          q.text.toLowerCase().includes(search.toLowerCase()) ||
          q.author.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredHadiths = filteredHadiths.slice(0, limitNum);
      }
    }

    return prettyJsonResponse({
      data: filteredHadiths,
      count: filteredHadiths.length,
    });
  } catch (error) {
    return prettyJsonResponse(
      {
        error: `Failed to process request: ${(error as Error).message}`,
      },
      500,
    );
  }
}
