import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.resolve(__dirname, '../public/images/gallery');
const OPTIMIZED_DIR = path.resolve(GALLERY_DIR, 'optimized');
const THUMB_DIR = path.resolve(OPTIMIZED_DIR, 'thumb');
const LARGE_DIR = path.resolve(OPTIMIZED_DIR, 'large');

// Tamaños objetivo (ancho)
const THUMB_WIDTH = 400;
const LARGE_WIDTH = 1200;

function ensureDirs() {
    [OPTIMIZED_DIR, THUMB_DIR, LARGE_DIR].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
}

async function processImages() {
    console.log('🚀 Iniciando optimización de imágenes...');
    ensureDirs();

    const files = fs.readdirSync(GALLERY_DIR).filter(f =>
        ['.png', '.jpg', '.jpeg'].includes(path.extname(f).toLowerCase())
    );

    for (const file of files) {
        const inputPath = path.join(GALLERY_DIR, file);
        const baseName = path.parse(file).name;

        const thumbPath = path.join(THUMB_DIR, `${baseName}.webp`);
        const largePath = path.join(LARGE_DIR, `${baseName}.webp`);

        console.log(`📦 Procesando: ${file}...`);

        try {
            // Generar Thumbnail (WebP)
            if (!fs.existsSync(thumbPath)) {
                const tempThumb = path.join(THUMB_DIR, `${baseName}_temp.png`);
                execSync(`sips -Z ${THUMB_WIDTH} "${inputPath}" --out "${tempThumb}"`, { stdio: 'ignore' });
                execSync(`cwebp -q 80 "${tempThumb}" -o "${thumbPath}"`, { stdio: 'ignore' });
                fs.unlinkSync(tempThumb);
                console.log(`  ✅ Thumbnail generado.`);
            } else {
                console.log(`  ⏩ Thumbnail ya existe.`);
            }

            // Generar Large (WebP)
            if (!fs.existsSync(largePath)) {
                const tempLarge = path.join(LARGE_DIR, `${baseName}_temp.png`);
                execSync(`sips -Z ${LARGE_WIDTH} "${inputPath}" --out "${tempLarge}"`, { stdio: 'ignore' });
                execSync(`cwebp -q 85 "${tempLarge}" -o "${largePath}"`, { stdio: 'ignore' });
                fs.unlinkSync(tempLarge);
                console.log(`  ✅ Versión Large generada.`);
            } else {
                console.log(`  ⏩ Versión Large ya existe.`);
            }

        } catch (error) {
            console.error(`❌ Error procesando ${file}:`, error.message);
        }
    }

    console.log('🏁 Proceso de imágenes finalizado.');
}

processImages().catch(console.error);
