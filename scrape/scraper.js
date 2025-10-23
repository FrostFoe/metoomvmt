const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs").promises;
const path = require("path");

class QuranScraper {
  constructor(baseUrl = "https://alqurans.com") {
    this.baseUrl = baseUrl;
    this.delay = 1500;
  }

  async delayExecution(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async fetchPage(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        timeout: 30000,
      });
      return cheerio.load(response.data);
    } catch (error) {
      console.error(`Error fetching ${url}:`, error.message);
      throw error;
    }
  }

  async getAllSurahUrls() {
    console.log("Fetching all surah URLs...");
    const $ = await this.fetchPage(`${this.baseUrl}/sura.php`);
    const surahs = [];

    $("table.table-striped tr").each((index, row) => {
      const cells = $(row).find("td");
      if (cells.length >= 3) {
        const surahNumber = $(cells[0]).text().trim();
        const surahLink = $(cells[1]).find("a");
        const totalAyats = $(cells[2]).text().trim();

        if (surahLink.length && surahNumber && !isNaN(surahNumber)) {
          const href = surahLink.attr("href");
          const nameText = surahLink.text().trim();

          // FIXED: Extract full transliteration (everything before the hyphen)
          const nameMatch = nameText.match(/(.+?)\s*-\s*(.+)/);
          let transliteration = nameMatch ? nameMatch[1].trim() : nameText;
          const bengaliName = nameMatch ? nameMatch[2].trim() : "";

          // Special handling for specific surah names that get cut off
          transliteration = this.fixTransliteration(
            parseInt(surahNumber),
            transliteration,
          );

          if (href) {
            const fullUrl = href.startsWith("http")
              ? href
              : `${this.baseUrl}/${href}`;
            surahs.push({
              id: parseInt(surahNumber),
              transliteration: transliteration,
              bengaliName: bengaliName,
              url: fullUrl,
              total_verses: parseInt(totalAyats) || 0,
            });
          }
        }
      }
    });

    console.log(`Found ${surahs.length} surahs`);
    return surahs;
  }

  // FIXED: Function to correct truncated transliterations
  fixTransliteration(surahId, transliteration) {
    const fullTransliterations = {
      1: "Al-Fatihah",
      2: "Al-Baqarah",
      3: "Al-Imran",
      4: "An-Nisa",
      5: "Al-Maidah",
      6: "Al-AnAm",
      7: "Al-A'Raf",
      8: "Al-Anfal",
      9: "At-Tawbah",
      10: "Yunus",
      11: "Hud",
      12: "Yusuf",
      13: "Ar-Ra'd",
      14: "Ibrahim",
      15: "Al-Hijr",
      16: "An-Nahl",
      17: "Israel",
      18: "Al-Kahf",
      19: "Maryam",
      20: "Ta-ha",
      21: "Al-Anbiyaa",
      22: "Al-Haj",
      23: "Al-Muminun",
      24: "An-Nur",
      25: "Al-Furqan",
      26: "Ash-Shu'ara",
      27: "An-Naml",
      28: "Al-Qasas",
      29: "Al-Ankabut",
      30: "Ar-Rum",
      31: "Luqman",
      32: "As-Sajdah",
      33: "Al-Ahzab",
      34: "Saba",
      35: "Fatir",
      36: "Ya-Sin",
      37: "As-Saffat",
      38: "Sad",
      39: "Az-Zumar",
      40: "Al-Mumin",
      41: "Ha-Mim",
      42: "Ash-Shuraa",
      43: "Az-Zukhruf",
      44: "Ad-Dukhan",
      45: "Al-Jathiyah",
      46: "Al-Ahqaf",
      47: "Muhammad",
      48: "Al-Fath",
      49: "Al-Hujurat",
      50: "Qaf",
      51: "Az-Zariyat",
      52: "At-Tur",
      53: "An-Najm",
      54: "Al-Qamar",
      55: "Ar-Rahman",
      56: "Al-Waqiah",
      57: "Al-Hadid",
      58: "Al-Mujadila",
      59: "Al-Hashr",
      60: "Al-Mumtahanah",
      61: "As-Saf",
      62: "Al-Jumu'ah",
      63: "Al-Munafiqun",
      64: "At-Taghabun",
      65: "At-Talaq",
      66: "At-Tahrim",
      67: "Al-Mulk",
      68: "Al-Qalam",
      69: "Al-Haqqah",
      70: "Al-Ma'arij",
      71: "Nuh",
      72: "Al-Jinn",
      73: "Al-Muzzammil",
      74: "Al-Muddaththir",
      75: "Al-Qiyamah",
      76: "Ad-Dahr",
      77: "Al-Mursalat",
      78: "An-Naba",
      79: "An-Nazi'at",
      80: "Abasa",
      81: "At-Takwir",
      82: "Al-Infitar",
      83: "Al-Mutaffifin",
      84: "Al-Inshiqaq",
      85: "Al-Buruj",
      86: "At-Tariq",
      87: "Al-A'la",
      88: "Al-Ghashiyah",
      89: "Al-Fajr",
      90: "Al-Balad",
      91: "Ash-Shams",
      92: "Al-Layl",
      93: "Ad-Duhaa",
      94: "Ash-Sharh",
      95: "At-Tin",
      96: "Al-Alaq",
      97: "Al-Qadr",
      98: "Al-Bayyinah",
      99: "Az-Zalzalah",
      100: "Al-Adiyat",
      101: "Al-Qari'a",
      102: "At-Takathur",
      103: "Al-Asr",
      104: "Al-Humaza",
      105: "Al-Fil",
      106: "Quraysh",
      107: "Al-Ma'un",
      108: "Al-Kauthar",
      109: "Al-Kafirun",
      110: "An-Nasr",
      111: "Lahab",
      112: "Al-Ikhlas",
      113: "Al-Falaq",
      114: "An-Nas",
    };

    return fullTransliterations[surahId] || transliteration;
  }

  async scrapeSurahData(surahInfo) {
    try {
      console.log(
        `[${surahInfo.id}/114] Scraping: ${surahInfo.transliteration}`,
      );
      const $ = await this.fetchPage(surahInfo.url);

      // Extract surah metadata - FIXED: Use the corrected transliteration from surahInfo
      const surahData = {
        id: surahInfo.id,
        name: this.extractSurahName($, surahInfo),
        transliteration: surahInfo.transliteration, // Use the fixed transliteration
        translation: this.extractTranslation($, surahInfo),
        type: this.extractSurahType($),
        total_verses: surahInfo.total_verses,
        verses: [],
      };

      // Extract verses from current page
      const currentPageVerses = this.extractVerses($);
      surahData.verses.push(...currentPageVerses);

      // Check for pagination and scrape other pages
      const otherPages = await this.scrapeOtherPages($, surahInfo.url);
      surahData.verses.push(...otherPages);

      // Sort verses by ID and remove duplicates
      surahData.verses = surahData.verses
        .filter(
          (verse, index, self) =>
            index === self.findIndex((v) => v.id === verse.id),
        )
        .sort((a, b) => a.id - b.id);

      // Update total verses count based on actual scraped data
      if (surahData.verses.length > 0) {
        surahData.total_verses = surahData.verses.length;
      }

      // FIXED: Use safe filename
      const safeFilename = surahData.transliteration
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "");

      const individualFile = `surahs/surah_${surahData.id.toString().padStart(3, "0")}_${safeFilename}.json`;
      await this.saveToFile(surahData, individualFile);

      console.log(
        `✓ ${surahInfo.transliteration}: ${surahData.verses.length} verses`,
      );
      return surahData;
    } catch (error) {
      console.error(
        `✗ Failed to scrape ${surahInfo.transliteration}:`,
        error.message,
      );
      throw error;
    }
  }

  async scrapeOtherPages($, baseUrl) {
    const allVerses = [];

    // Find pagination links
    const paginationLinks = $('.btn-group a.btn-info[href*="page"]');
    const pageUrls = new Set();

    paginationLinks.each((index, element) => {
      const href = $(element).attr("href");
      if (href && href.includes("page")) {
        let fullUrl;
        if (href.startsWith("http")) {
          fullUrl = href;
        } else if (href.startsWith("/")) {
          fullUrl = `${this.baseUrl}${href}`;
        } else {
          // For relative URLs, construct properly
          const baseFilename = baseUrl.split("/").pop();
          if (href.includes(baseFilename.replace(".html", ""))) {
            fullUrl = `${this.baseUrl}/${href}`;
          } else {
            const baseDir = baseUrl.substring(0, baseUrl.lastIndexOf("/"));
            fullUrl = `${baseDir}/${href}`;
          }
        }

        // Clean up URL
        fullUrl = fullUrl.replace(/([^:]\/)\/+/g, "$1");
        pageUrls.add(fullUrl);
      }
    });

    if (pageUrls.size > 0) {
      console.log(`  ↳ Found ${pageUrls.size} additional pages`);
    }

    // Scrape each page
    for (const pageUrl of pageUrls) {
      try {
        await this.delayExecution(this.delay);

        console.log(`  ↳ Scraping: ${pageUrl}`);
        const page$ = await this.fetchPage(pageUrl);
        const pageVerses = this.extractVerses(page$);
        allVerses.push(...pageVerses);

        console.log(`  ↳ ✓ Scraped ${pageVerses.length} verses`);
      } catch (error) {
        console.error(`  ↳ ✗ Error scraping page ${pageUrl}:`, error.message);

        // Try alternative URL format if 404 occurs
        if (error.response && error.response.status === 404) {
          const failedFilename = pageUrl.split("/").pop();
          const alternativeUrl = `${this.baseUrl}/${failedFilename}`;

          if (alternativeUrl !== pageUrl) {
            try {
              console.log(`  ↳ Attempting alternative: ${alternativeUrl}`);
              const page$ = await this.fetchPage(alternativeUrl);
              const pageVerses = this.extractVerses(page$);
              allVerses.push(...pageVerses);
              console.log(`  ↳ ✓ Success with alternative URL`);
            } catch (altError) {
              console.error(`  ↳ ✗ Alternative URL also failed`);
            }
          }
        }
      }
    }

    return allVerses;
  }

  extractSurahName($, surahInfo) {
    const arabicSelectors = [
      ".info-box.bg-aqua .info-box-number",
      "h1",
      ".content-header h1",
      "title",
    ];

    for (const selector of arabicSelectors) {
      const element = $(selector);
      if (element.length) {
        const text = element.text().trim();
        const arabicMatch = text.match(
          /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+/,
        );
        if (arabicMatch) {
          const arabicText = arabicMatch[0].trim();
          if (arabicText.length > 2) return arabicText;
        }
      }
    }

    return this.getArabicNameFallback(surahInfo.id);
  }

  getArabicNameFallback(surahId) {
    const arabicNames = {
      1: "الفاتحة",
      2: "البقرة",
      3: "آل عمران",
      4: "النساء",
      5: "المائدة",
      6: "الأنعام",
      7: "الأعراف",
      8: "الأنفال",
      9: "التوبة",
      10: "يونس",
      11: "هود",
      12: "يوسف",
      13: "الرعد",
      14: "إبراهيم",
      15: "الحجر",
      16: "النحل",
      17: "الإسراء",
      18: "الكهف",
      19: "مريم",
      20: "طه",
      21: "الأنبياء",
      22: "الحج",
      23: "المؤمنون",
      24: "النور",
      25: "الفرقان",
      26: "الشعراء",
      27: "النمل",
      28: "القصص",
      29: "العنكبوت",
      30: "الروم",
      31: "لقمان",
      32: "السجدة",
      33: "الأحزاب",
      34: "سبإ",
      35: "فاطر",
      36: "يس",
      37: "الصافات",
      38: "ص",
      39: "الزمر",
      40: "غافر",
      41: "فصلت",
      42: "الشورى",
      43: "الزخرف",
      44: "الدخان",
      45: "الجاثية",
      46: "الأحقاف",
      47: "محمد",
      48: "الفتح",
      49: "الحجرات",
      50: "ق",
      51: "الذاريات",
      52: "الطور",
      53: "النجم",
      54: "القمر",
      55: "الرحمن",
      56: "الواقعة",
      57: "الحديد",
      58: "المجادلة",
      59: "الحشر",
      60: "الممتحنة",
      61: "الصف",
      62: "الجمعة",
      63: "المنافقون",
      64: "التغابن",
      65: "الطلاق",
      66: "التحريم",
      67: "الملك",
      68: "القلم",
      69: "الحاقة",
      70: "المعارج",
      71: "نوح",
      72: "الجن",
      73: "المزمل",
      74: "المدثر",
      75: "القيامة",
      76: "الإنسان",
      77: "المرسلات",
      78: "النبأ",
      79: "النازعات",
      80: "عبس",
      81: "التكوير",
      82: "الانفطار",
      83: "المطففين",
      84: "الانشقاق",
      85: "البروج",
      86: "الطارق",
      87: "الأعلى",
      88: "الغاشية",
      89: "الفجر",
      90: "البلد",
      91: "الشمس",
      92: "الليل",
      93: "الضحى",
      94: "الشرح",
      95: "التين",
      96: "العلق",
      97: "القدر",
      98: "البينة",
      99: "الزلزلة",
      100: "العاديات",
      101: "القارعة",
      102: "التكاثر",
      103: "العصر",
      104: "الهمزة",
      105: "الفيل",
      106: "قريش",
      107: "الماعون",
      108: "الكوثر",
      109: "الكافرون",
      110: "النصر",
      111: "المسد",
      112: "الإخلاص",
      113: "الفلق",
      114: "الناس",
    };
    return arabicNames[surahId] || `سورة ${surahId}`;
  }

  extractTranslation($, surahInfo) {
    const infoBox = $(".info-box.bg-yellow .progress-description");
    const meaningText = infoBox
      .filter((i, el) => $(el).text().toLowerCase().includes("meaning:"))
      .first()
      .text();

    const meaningMatch = meaningText.match(/Meaning:\s*([^-—]+)/i);
    if (meaningMatch) return meaningMatch[1].trim();

    // Fallback translations
    const fallbackTranslations = {
      1: "The Opening",
      2: "The Cow",
      3: "Family of Imran",
      4: "The Women",
      5: "The Table Spread",
      6: "The Cattle",
      7: "The Heights",
      8: "The Spoils of War",
      9: "The Repentance",
      10: "Jonah",
      11: "Hud",
      12: "Joseph",
      13: "The Thunder",
      14: "Abraham",
      15: "The Rocky Tract",
      16: "The Bee",
      17: "The Night Journey",
      18: "The Cave",
      19: "Mary",
      20: "Ta-Ha",
      67: "The Sovereignty",
      68: "The Pen",
      69: "The Reality",
      70: "The Ascending Stairways",
      71: "Noah",
      72: "The Jinn",
      73: "The Enshrouded One",
      74: "The Cloaked One",
    };

    return fallbackTranslations[surahInfo.id] || surahInfo.transliteration;
  }

  extractSurahType($) {
    const infoBox = $(".info-box.bg-yellow .info-box-content");
    const typeText = infoBox.text();

    if (typeText.includes("Mecca") || typeText.toLowerCase().includes("meccan"))
      return "Meccan";
    if (
      typeText.includes("Medina") ||
      typeText.toLowerCase().includes("medinan")
    )
      return "Medinan";

    return "Meccan";
  }

  extractVerses($) {
    const verses = [];
    const tables = $("table.table-striped");
    const targetTables = tables.length ? tables : $("table");

    targetTables.each((tableIndex, table) => {
      const $table = $(table);
      let currentVerse = null;

      $table.find("tr").each((rowIndex, row) => {
        const cells = $(row).find("td");

        if (cells.length >= 3) {
          const verseId = $(cells[0]).text().trim();

          if (verseId && !isNaN(verseId) && verseId !== "") {
            if (
              currentVerse &&
              currentVerse.translation_bn &&
              currentVerse.translation_en
            ) {
              verses.push(currentVerse);
            }

            currentVerse = {
              id: parseInt(verseId),
              text: $(cells[1]).text().trim(),
              transliteration: $(cells[2]).text().trim(),
              translation_bn: "",
              translation_en: "",
            };
          } else if ((verseId === "" || verseId === " ") && currentVerse) {
            const bnText = $(cells[1]).text().trim();
            const enText = $(cells[2]).text().trim();

            if (bnText && !bnText.match(/^\d+$/) && bnText.length > 1) {
              currentVerse.translation_bn = bnText;
            }
            if (enText && !enText.match(/^\d+$/) && enText.length > 1) {
              currentVerse.translation_en = enText;
            }
          }
        }
      });

      if (
        currentVerse &&
        currentVerse.translation_bn &&
        currentVerse.translation_en
      ) {
        verses.push(currentVerse);
      }
    });

    return verses;
  }

  async scrapeAllSurahs(limit = null) {
    try {
      const surahList = await this.getAllSurahUrls();
      const surahsToScrape = limit ? surahList.slice(0, limit) : surahList;

      const results = [];
      const failedSurahs = [];

      for (const [index, surahInfo] of surahsToScrape.entries()) {
        try {
          await this.delayExecution(this.delay);

          const surahData = await this.scrapeSurahData(surahInfo);
          results.push(surahData);

          const progress = (
            ((index + 1) / surahsToScrape.length) *
            100
          ).toFixed(1);
          console.log(
            `Progress: ${progress}% (${index + 1}/${surahsToScrape.length})\n`,
          );
        } catch (error) {
          console.error(
            `✗ Failed to scrape surah ${surahInfo.id}: ${surahInfo.transliteration}`,
          );
          failedSurahs.push(surahInfo);
        }
      }

      await this.saveToFile(results, "quran_complete.json");

      if (failedSurahs.length > 0) {
        console.log(`\nFailed to scrape ${failedSurahs.length} surahs:`);
        failedSurahs.forEach((surah) => {
          console.log(`- ${surah.id}: ${surah.transliteration}`);
        });
        await this.saveToFile(failedSurahs, "failed_surahs.json");
      }

      console.log(
        `\n✓ Successfully scraped ${results.length} out of ${surahsToScrape.length} surahs`,
      );
      return results;
    } catch (error) {
      console.error("Error in scrapeAllSurahs:", error.message);
      throw error;
    }
  }

  async saveToFile(data, filename) {
    try {
      const dir = path.dirname(filename);
      await fs.mkdir(dir, { recursive: true });

      await fs.writeFile(filename, JSON.stringify(data, null, 2), "utf8");
      console.log(`✓ Data saved to ${filename}`);
    } catch (error) {
      console.error("Error saving file:", error.message);
      throw error;
    }
  }

  async scrapeWithProgress(limit = null) {
    console.log("🚀 Starting Quran Scraper");
    console.log("=========================\n");

    const startTime = Date.now();

    try {
      const allSurahs = await this.scrapeAllSurahs(limit);

      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000 / 60).toFixed(2);

      console.log(`\n🎉 Scraping completed in ${duration} minutes!`);
      console.log(`📊 Total surahs: ${allSurahs.length}`);

      const totalVerses = allSurahs.reduce(
        (sum, surah) => sum + surah.verses.length,
        0,
      );
      console.log(`📖 Total verses: ${totalVerses}`);

      return allSurahs;
    } catch (error) {
      console.error("❌ Scraping failed:", error.message);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const scraper = new QuranScraper();

  try {
    console.log("🚀 Starting FULL Quran Scraper - All 114 Surahs");
    console.log("================================================\n");

    // Scrape all 114 surahs
    const allSurahs = await scraper.scrapeWithProgress(); // No limit parameter = all surahs

    console.log("\n🎉 COMPLETED! All 114 surahs scraped successfully!");
    console.log("==================================================");
  } catch (error) {
    console.error("❌ Scraping failed:", error.message);
    process.exit(1);
  }
}

module.exports = QuranScraper;

if (require.main === module) {
  main();
}
