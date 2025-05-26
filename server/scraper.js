// scraper.js
// REFERENCES:
// Web Scraping With JavaScript and Node.js Guide - AVAILABLE AT:  https://brightdata.com/blog/how-tos/web-scraping-with-node-js

// scraper.js
import axios from "axios";
import { load } from "cheerio";
import { writeFile } from "fs/promises";
import path from "path";

async function scrapeCoursePage(url) {
  const { data: html } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    timeout: 30_000,
  });

  const rawPageContent = load(html);

  return rawPageContent("main") // load <main> element from fetched HTML
    .find("p, h1, h2, h3, h4, h5, h6, li") // select only relevant text elements
    .map((_, el) => rawPageContent(el).text().trim()) // remove extra whitespaces
    .get() // convert collection of strings into a javascript array
    .join(" "); // join strings into one string
}

function cleanText(raw) {
  // insert newlines around known single-word headings
  raw = raw.replace(
    /\b(Courses|About|Research|Events|People|Public programme)\b/g,
    "\n$1\n"
  );

  return (
    raw
      .split("\n") // 2) split into lines
      .map((l) => l.trim()) // 3a) trim
      .filter((l) => l.length > 0) // 3b) drop empty

      // drop anything that matches boilerplate / photo credits / nav items
      .filter(
        (l) =>
          !/^(Toggle caption|Caption|See all stories|Open days|CCI Shows \d{4}|CCI news)$/i.test(
            l
          ) &&
          !/(courtesy of UAL|photograph by|photography:|photograph:|Photography:|Photograph:|image credit|image courtesy|image:)/i.test(
            l
          )
      )

      // drop lines under 5 words (likely still a stray heading)
      .filter((l) => l.split(/\s+/).length >= 5)

      // dedupe exact repeats
      .filter((l, i, arr) => arr.indexOf(l) === i)

      // re-join into a single block
      .join(" ")
  );
}

(async () => {
  // List of URLs to scrape
  const urls = [
    // CCI Overview
    "https://www.arts.ac.uk/creative-computing-institute",
    "https://www.arts.ac.uk/creative-computing-institute/about",
    "https://www.arts.ac.uk/creative-computing-institute/about/our-facilities",

    // Courses Hub
    "https://www.arts.ac.uk/creative-computing-institute/courses",

    // Undergraduates
    "https://www.arts.ac.uk/creative-computing-institute/courses/undergraduate",
    "https://www.arts.ac.uk/subjects/creative-computing/undergraduate/bsc-hons-creative-computing",
    "https://www.arts.ac.uk/subjects/creative-computing/undergraduate/bsc-hons-creative-robotics",
    "https://www.arts.ac.uk/subjects/creative-computing/undergraduate/bsc-hons-computer-science",
    "https://www.arts.ac.uk/subjects/creative-computing/undergraduate/bsc-hons-data-science-and-ai",
    "https://www.arts.ac.uk/creative-computing-institute/courses/ual-diploma",
    "https://www.arts.ac.uk/subjects/creative-computing/undergraduate/ual-creative-computing-institute-diploma#course-summary",
    "https://www.arts.ac.uk/subjects/creative-computing/undergraduate/ual-diploma-in-apple-development",

    // Postgraduates
    "https://www.arts.ac.uk/creative-computing-institute/courses/postgraduate",
    "https://www.arts.ac.uk/subjects/creative-computing/postgraduate/msc-creative-robotics",
    "https://www.arts.ac.uk/subjects/creative-computing/postgraduate/msc-computer-science",
    "https://www.arts.ac.uk/subjects/creative-computing/postgraduate/msc-data-science-and-ai",
    "https://www.arts.ac.uk/subjects/creative-computing/postgraduate/msc-applied-machine-learning-for-creatives",
    "https://www.arts.ac.uk/subjects/creative-computing/postgraduate/mamsc-computing-in-the-creative-industries-modular",
    "https://www.arts.ac.uk/subjects/creative-computing/postgraduate/ma-internet-equalities",
    "https://www.arts.ac.uk/subjects/creative-computing/postgraduate/mres-creative-computing",
    "https://www.arts.ac.uk/subjects/creative-computing/postgraduate/mres-creative-computing#course-summary",
    "https://www.arts.ac.uk/subjects/creative-computing/postgraduate/msc-creative-computing",

    // Research & PhD
    "https://www.arts.ac.uk/creative-computing-institute/courses/mphil-and-phd-in-creative-computing",
    "https://www.arts.ac.uk/creative-computing-institute/research/preparing-your-phd-proposal",
    "https://www.arts.ac.uk/research/phd-and-mphil-degrees",

    // Application & Admissions
    "https://www.arts.ac.uk/study-at-ual/apply",
    "https://www.arts.ac.uk/study-at-ual/apply/how-to-apply-a-quick-overview",
    "https://www.arts.ac.uk/study-at-ual/apply/your-personal-statement",
    "https://www.arts.ac.uk/study-at-ual/apply/portfolio-advice",

    // After you apply
    "https://www.arts.ac.uk/study-at-ual/apply/after-you-apply",
    "https://www.arts.ac.uk/study-at-ual/apply/after-you-apply/how-to-upload-your-portfolio",
    "https://www.arts.ac.uk/study-at-ual/apply/after-you-apply/Interviews-What-to-expect",
    "https://www.arts.ac.uk/study-at-ual/apply/after-you-apply/conditional-unconditional-offers",
    "https://www.arts.ac.uk/study-at-ual/apply/after-you-apply/alternative-offers",
    "https://www.arts.ac.uk/study-at-ual/apply/after-you-apply/unsuccessful-applications",
    "https://www.arts.ac.uk/study-at-ual/apply/admissions-complaints-and-appeals",

    // Fees & Funding
    "https://www.arts.ac.uk/study-at-ual/fees-and-funding/phd-and-mphil-funding",
    "https://www.arts.ac.uk/study-at-ual/fees-and-funding/phd-and-mphil-funding/ual-post-graduate-research-studentships",
    "https://www.arts.ac.uk/study-at-ual/fees-and-funding/phd-and-mphil-funding/alternative-guide-to-postgraduate-funding",
    "https://www.arts.ac.uk/study-at-ual/fees-and-funding/phd-and-mphil-funding/doctoral-loan",
    "https://www.arts.ac.uk/study-at-ual/how-to-enrol/pay-your-tuition-fees",
    "https://www.arts.ac.uk/study-at-ual/how-to-enrol/pay-your-tuition-fees/tuition-fees-making-a-direct-payment",
    "https://www.arts.ac.uk/study-at-ual/how-to-enrol/pay-your-tuition-fees/sponsors-and-pro-forma-invoices",
    "https://www.arts.ac.uk/study-at-ual/how-to-enrol/pay-your-tuition-fees/sanctioned-countries",
    "https://www.arts.ac.uk/study-at-ual/how-to-enrol/pay-your-tuition-fees/funding-your-studies-by-slc-loan",

    // Student Support Services
    "https://www.arts.ac.uk/students/student-services/student-advice-service",
    "https://www.arts.ac.uk/students/student-services/disability-and-dyslexia",
    "https://www.arts.ac.uk/students/student-services/disability-and-dyslexia/disability-and-dyslexia-what-to-expect",
    "https://www.arts.ac.uk/students/student-services/disability-and-dyslexia/dyslexia-screening-and-assessment",
    "https://www.arts.ac.uk/students/student-services/disability-and-dyslexia/disabled-students-allowances-dsas",
    "https://www.arts.ac.uk/students/student-services/disability-and-dyslexia/provide-feedback",
    "https://www.arts.ac.uk/students/student-services/disability-and-dyslexia/information-for-non-medical-help-providers",
    "https://www.arts.ac.uk/students/student-services/disability-and-dyslexia/information-for-dsa-needs-assessors",

    // Language & International
    "https://www.arts.ac.uk/study-at-ual/language-centre/english-language-requirements",
    "https://www.arts.ac.uk/study-at-ual/international/pre-sessional-english",
    "https://researchers.arts.ac.uk/",
    "https://www.arts.ac.uk/study-at-ual/international/your-country",
    // "https://www.arts.ac.uk/study-at-ual/international/your-country/africa-and-middle-east",
    // "https://www.arts.ac.uk/study-at-ual/international/your-country/latin-america",
    // "https://www.arts.ac.uk/study-at-ual/international/your-country/north-america",
    // "https://www.arts.ac.uk/study-at-ual/international/your-country/east-asia",
    // "https://www.arts.ac.uk/study-at-ual/international/your-country/south-asia",
    // "https://www.arts.ac.uk/study-at-ual/international/your-country/south-east-asia",
    // "https://www.arts.ac.uk/study-at-ual/international/your-country/australasia",
    // "https://www.arts.ac.uk/study-at-ual/international/your-country/europe-eu",
    // "https://www.arts.ac.uk/study-at-ual/international/your-country/europe-non-eu",
    // "https://www.arts.ac.uk/study-at-ual/international/your-country/central-asia",

    // Study Abroad & Short Courses
    "https://www.arts.ac.uk/creative-computing-institute/courses/study-abroad/summer-study-abroad-creative-computing",
    "https://www.arts.ac.uk/study-at-ual/study-abroad/summer-study-abroad",
    "https://www.arts.ac.uk/study-at-ual/study-abroad/integrated-study-abroad",
    "https://www.arts.ac.uk/creative-computing-institute/public-programme/intensive-courses",

    // Public Programme & Press
    "https://www.arts.ac.uk/creative-computing-institute/public-programme/fellowships",
    "https://www.arts.ac.uk/about-ual/press-office/stories/ccigoogle-tensorflow.js-collaboration",

    // External Partners
    // "https://www.futurelearn.com/partners",
  ];

  // Scrape each page and clean it up
  const results = [];
  for (const url of urls) {
    console.log("Scraping and cleaning up: ", url);
    const rawPageContent = await scrapeCoursePage(url);
    const text = cleanText(rawPageContent);
    results.push({
      url,
      scrapedAt: new Date().toISOString(),
      text,
    });
  }

  // Save it to a JSON file
  const outPath = path.resolve("data", "courses.json"); // path file
  await writeFile(outPath, JSON.stringify(results, null, 2), "utf8");
  console.log("Wrote", results.length, "records to", outPath);
})();
