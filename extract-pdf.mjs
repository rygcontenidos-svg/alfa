import { getDocument } from "pdfjs-dist/legacy/build/pdf.js";
import { readFileSync, writeFileSync } from "node:fs";

const [, , file, out] = process.argv;
const data = new Uint8Array(readFileSync(file));
const doc = await getDocument({ data }).promise;
let text = "";
for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i);
  const content = await page.getTextContent();
  const items = content.items.filter((it) => "str" in it && it.str.trim());
  let pageText = "";
  let prevY = null;
  for (const it of items) {
    const y = Math.round(it.transform[5]);
    if (prevY !== null && Math.abs(y - prevY) > 5) {
      pageText += "\n";
    } else if (pageText && !pageText.endsWith("\n") && !pageText.endsWith(" ")) {
      pageText += " ";
    }
    pageText += it.str;
    prevY = y;
  }
  text += `\n--- PAGINA ${i} ---\n` + pageText + "\n";
}
writeFileSync(out, text, "utf8");
console.log(`OK: ${doc.numPages} paginas -> ${out}`);
