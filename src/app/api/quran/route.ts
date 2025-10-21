import { type NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Function to get the path to the quran data directory
const getQuranDataPath = () => {
  return path.join(process.cwd(), "src", "lib", "data", "quran");
};

// GET all surahs list or a specific surah
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const surahId = searchParams.get("id");

  const quranDir = getQuranDataPath();

  if (surahId) {
    try {
      // Ensure the surahId is a number and format it to 3 digits (e.g., 1 -> 001)
      const formattedSurahId = String(surahId).padStart(3, "0");
      const filePath = path.join(quranDir, `${formattedSurahId}.json`);
      const fileContent = await fs.readFile(filePath, "utf8");
      const data = JSON.parse(fileContent);
      return NextResponse.json(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return NextResponse.json({ error: "Surah not found" }, { status: 404 });
      }
      return NextResponse.json(
        { error: `Failed to read surah: ${(error as Error).message}` },
        { status: 500 },
      );
    }
  } else {
    // List all surahs
    try {
      const files = await fs.readdir(quranDir);
      const surahFiles = files.filter((file) => file.endsWith(".json"));

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
    } catch (error) {
      return NextResponse.json(
        {
          error: `Failed to list surahs: ${(error as Error).message}`,
        },
        { status: 500 },
      );
    }
  }
}