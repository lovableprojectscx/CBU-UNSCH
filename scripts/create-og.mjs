import sharp from "sharp";
import fs from "fs";

async function createOg() {
  const bg = await sharp("src/assets/comunidad-cbu-grupo.webp")
    .resize(1200, 630, { fit: "cover", position: "center" })
    .toBuffer();

  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.15" />
          <stop offset="50%" stop-color="#000000" stop-opacity="0.40" />
          <stop offset="100%" stop-color="#800020" stop-opacity="0.95" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#grad)" />
      
      <rect x="50" y="45" width="260" height="42" rx="21" fill="#ffffff" fill-opacity="0.95" />
      <text x="180" y="72" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#800020" text-anchor="middle" letter-spacing="1.5">CBU UNSCH · AYACUCHO</text>

      <text x="50" y="475" font-family="Georgia, serif" font-size="50" font-weight="bold" fill="#ffffff">Comunidad Bíblica Universitaria</text>
      <text x="50" y="530" font-family="Georgia, serif" font-style="italic" font-size="32" fill="#fecdd3">«La universidad, nuestra tierra de misión»</text>
      <text x="50" y="575" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="500" fill="#ffffff" fill-opacity="0.92">UNSCH · Estudiantes de fe en el campus · Filial oficial de AGEUP Perú</text>
    </svg>
  `);

  await sharp(bg)
    .composite([{ input: svgOverlay, top: 0, left: 0 }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile("public/og-image.jpg");

  console.log("Generated public/og-image.jpg, size:", fs.statSync("public/og-image.jpg").size);

  await sharp(bg)
    .composite([{ input: svgOverlay, top: 0, left: 0 }])
    .png({ quality: 85 })
    .toFile("public/og-image.png");

  console.log("Generated public/og-image.png, size:", fs.statSync("public/og-image.png").size);

  // Lourdes Volunteering OG image
  await sharp("src/assets/banner-voluntariado.webp")
    .resize(1200, 630, { fit: "cover", position: "center" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile("public/og-lourdes.jpg");

  console.log("Generated public/og-lourdes.jpg, size:", fs.statSync("public/og-lourdes.jpg").size);
}

createOg().catch(console.error);
