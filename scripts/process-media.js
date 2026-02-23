import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

const VIDEO_DIR = './public/videos/drops';
const BARS = 40;

async function processVideos() {
    console.log('🚀 Iniciando optimización de media...');

    if (!fs.existsSync(VIDEO_DIR)) {
        console.error('❌ Directorio de videos no encontrado:', VIDEO_DIR);
        return;
    }

    const files = fs.readdirSync(VIDEO_DIR).filter(f =>
        (f.endsWith('.mp4') || f.endsWith('.mov') || f.endsWith('.MOV')) && !f.includes('.min.')
    );

    for (const file of files) {
        const inputPath = path.join(VIDEO_DIR, file);
        const outputBase = file.substring(0, file.lastIndexOf('.'));
        const outputPath = path.join(VIDEO_DIR, `${outputBase}.min.mp4`);
        const waveformPath = path.join(VIDEO_DIR, `${outputBase}.waveform.json`);

        // 1. Optimizar Video si no existe el mini
        if (!fs.existsSync(outputPath)) {
            console.log(`📦 Optimizando: ${file}...`);
            try {
                // Configuración de compresión equilibrada para web
                await execAsync(`ffmpeg -i "${inputPath}" -vcodec libx264 -crf 28 -preset fast -acodec aac -b:a 128k -y "${outputPath}"`);
                console.log(`✅ ${file} optimizado.`);
            } catch (e) {
                console.error(`❌ Error optimizando ${file}:`, e.message);
                continue;
            }
        }

        // 2. Extraer Waveform
        if (!fs.existsSync(waveformPath)) {
            console.log(`📊 Generando onda de audio para: ${file}...`);
            try {
                // Extraer audio a archivo temporal wav para procesar
                const tempWav = path.join(VIDEO_DIR, `${outputBase}.temp.wav`);
                await execAsync(`ffmpeg -i "${inputPath}" -vn -acodec pcm_s16le -ar 44100 -ac 1 -y "${tempWav}"`);

                // Leer el buffer para generar los picos
                const buffer = fs.readFileSync(tempWav);
                const samples = new Int16Array(buffer.buffer, buffer.byteOffset, buffer.length / 2);
                const peaks = [];
                const blockSize = Math.floor(samples.length / BARS);

                for (let i = 0; i < BARS; i++) {
                    let start = blockSize * i;
                    let sum = 0;
                    for (let j = 0; j < blockSize; j++) {
                        sum += Math.abs(samples[start + j]);
                    }
                    peaks.push(Math.min(100, Math.floor((sum / blockSize) / 327.68 * 4))); // Escalar a 0-100
                }

                fs.writeFileSync(waveformPath, JSON.stringify({ peaks }));
                fs.unlinkSync(tempWav);
                console.log(`✨ Waveform generada para ${file}`);
            } catch (e) {
                console.error(`❌ Error generando waveform para ${file}:`, e.message);
            }
        }
    }

    console.log('🏁 Proceso finalizado.');
}

processVideos().catch(console.error);
