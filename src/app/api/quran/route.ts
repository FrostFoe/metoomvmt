import { type NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Function to get the path to the quran data directory
const getQuranDataPath = () => {
  return path.join(process.cwd(), "src", "lib", "data", "quran");
};

// GET all surahs list, a specific surah, or a random verse
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const surahId = searchParams.get("id");
  const random = searchParams.get("random");

  const quranDir = getQuranDataPath();

  try {
    const files = await fs.readdir(quranDir);
    const surahFiles = files.filter((file) => file.endsWith(".json"));

    if (random) {
      if (surahFiles.length === 0) {
        return NextResponse.json(
          { error: "No surahs found" },
          { status: 404 },
        );
      }
      // Combine all verses from all surahs
      let allVerses = [];
      for (const file of surahFiles) {
        const filePath = path.join(quranDir, file);
        const fileContent = await fs.readFile(filePath, "utf8");
        const surahData = JSON.parse(fileContent);
        const versesWithSurahInfo = surahData.verses.map((verse: any) => ({
          ...verse,
          surah_id: surahData.id,
          surah_name: surahData.name,
          surah_transliteration: surahData.transliteration,
          surah_translation: surahData.translation,
        }));
        allVerses.push(...versesWithSurahInfo);
      }

      if (allVerses.length === 0) {
        return NextResponse.json(
          { error: "No verses found" },
          { status: 404 },
        );
      }

      // Select a random verse
      const randomVerse =
        allVerses[Math.floor(Math.random() * allVerses.length)];
      return NextResponse.json(randomVerse);
    }

    if (surahId) {
      // Ensure the surahId is a number and format it to 3 digits (e.g., 1 -> 001)
      const formattedSurahId = String(surahId).padStart(3, "0");
      const filePath = path.join(quranDir, `${formattedSurahId}.json`);
      try {
        const fileContent = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
          return NextResponse.json(
            { error: "Surah not found" },
            { status: 404 },
          );
        }
        throw error; // Re-throw other errors
      }
    } else {
      // List all surahs
      const surahList = await Promise.all(
        surahFiles.map(async (file) => {
          const fileContent = await fs.readFile(
            path.join(quranDir, file),
            "utf8",
          );
          const surahData = JSON.parse(fileContent);
          return {
            id: surahData.id,
            name: surahData.name,
            transliteration: surahData.transliteration,
            translation: surahData.translation,
            total_verses: surahData.total_verses,
            type: surahData.type,
          };
        }),
      );

      // Sort surahs by id
      surahList.sort((a, b) => a.id - b.id);

      return NextResponse.json({ surahs: surahList });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to process request: ${(error as Error).message}`,
      },
      { status: 500 },
    );
  }
}
