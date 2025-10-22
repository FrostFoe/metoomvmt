import { type NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Function to get the path to the quran data directory
const getQuranDataPath = () => {
  return path.join(process.cwd(), "src", "lib", "data", "quran");
};

const prettyJsonResponse = (data: any, status: number = 200) => {
  return new NextResponse(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

// Cache data in memory
let allSurahs: any[] | null = null;
let allVerses: any[] | null = null;

async function loadQuranData() {
  if (allSurahs !== null && allVerses !== null) {
    return { surahs: allSurahs, verses: allVerses };
  }

  const quranDir = getQuranDataPath();
  try {
    const files = await fs.readdir(quranDir);
    const surahFiles = files.filter((file) => file.endsWith(".json"));

    const loadedSurahs: any[] = [];
    const loadedVerses: any[] = [];

    for (const file of surahFiles) {
      const filePath = path.join(quranDir, file);
      const fileContent = await fs.readFile(filePath, "utf8");
      if (fileContent) {
        const surahData = JSON.parse(fileContent);
        loadedSurahs.push(surahData);
        const versesWithSurahInfo = surahData.verses.map((verse: any) => ({
          ...verse,
          surah_id: surahData.id,
          surah_name: surahData.name,
          surah_transliteration: surahData.transliteration,
          surah_translation: surahData.translation,
        }));
        loadedVerses.push(...versesWithSurahInfo);
      }
    }

    allSurahs = loadedSurahs.sort((a, b) => a.id - b.id);
    allVerses = loadedVerses;

    return { surahs: allSurahs, verses: allVerses };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      allSurahs = [];
      allVerses = [];
      return { surahs: [], verses: [] };
    }
    console.error("Failed to load Quran data:", error);
    // Cache empty arrays on other errors
    allSurahs = [];
    allVerses = [];
    return { surahs: [], verses: [] };
  }
}

// Preload data on server start
loadQuranData();

// GET all surahs list, a specific surah, or a random verse
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const surahId = searchParams.get("id");
  const random = searchParams.get("random");

  try {
    const { surahs, verses } = await loadQuranData();

    if (random) {
      if (verses.length === 0) {
        return prettyJsonResponse({ error: "No verses found" }, 404);
      }
      const randomVerse = verses[Math.floor(Math.random() * verses.length)];
      return prettyJsonResponse(randomVerse);
    }

    if (surahId) {
      const surahData = surahs.find((s) => s.id === parseInt(surahId, 10));
      if (surahData) {
        return prettyJsonResponse(surahData);
      } else {
        return prettyJsonResponse({ error: "Surah not found" }, 404);
      }
    } else {
      const surahList = surahs.map((surahData) => ({
        id: surahData.id,
        name: surahData.name,
        transliteration: surahData.transliteration,
        translation: surahData.translation,
        total_verses: surahData.total_verses,
        type: surahData.type,
      }));
      return prettyJsonResponse({ surahs: surahList });
    }
  } catch (error) {
    return prettyJsonResponse(
      {
        error: `Failed to process request: ${(error as Error).message}`,
      },
      500
    );
  }
}
