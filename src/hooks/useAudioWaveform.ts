import { useState, useEffect } from 'react';

/**
 * Hook para obtener la forma de onda de un video.
 * Intenta cargar un JSON pre-generado por rendimiento, 
 * con un fallback a decodificación en el cliente si no existe.
 */
export const useAudioWaveform = (videoUrl: string, bars: number = 40) => {
    const [waveform, setWaveform] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadWaveform = async () => {
            setIsLoading(true);

            // 1. Intentar cargar JSON pre-procesado (Estrategia de Carga Optimizada)
            // Se asume que el script de optimización generó video-name.waveform.json
            const jsonUrl = videoUrl.substring(0, videoUrl.lastIndexOf('.')) + '.waveform.json';

            try {
                const response = await fetch(jsonUrl);
                if (response.ok) {
                    const data = await response.json();
                    if (isMounted) {
                        setWaveform(data.peaks);
                        setIsLoading(false);
                        return;
                    }
                }
            } catch (err) {
                // Silenciamos este error ya que es un fallback esperado si no existe el JSON
            }

            // 2. Fallback: Decodificación en el cliente (Lenta para archivos grandes)
            try {
                // Evitar decodificar archivos .mov en el cliente si es posible, ya que suelen fallar
                if (videoUrl.toLowerCase().endsWith('.mov')) {
                    throw new Error('Client-side decoding skipped for .mov file');
                }

                const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                const response = await fetch(videoUrl);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const arrayBuffer = await response.arrayBuffer();

                // decodeAudioData puede fallar con ciertos codecs de video
                audioCtx.decodeAudioData(arrayBuffer, (audioBuffer) => {
                    const rawData = audioBuffer.getChannelData(0);
                    const samples = rawData.length;
                    const blockSize = Math.floor(samples / bars);
                    const peaks = [];

                    for (let i = 0; i < bars; i++) {
                        let start = blockSize * i;
                        let sum = 0;
                        for (let j = 0; j < blockSize; j++) {
                            sum = sum + Math.abs(rawData[start + j]);
                        }
                        peaks.push(Math.min(100, Math.floor((sum / blockSize) * 400)));
                    }

                    if (isMounted) {
                        setWaveform(peaks);
                        setIsLoading(false);
                    }
                }, (e) => {
                    throw e; // Lanza al catch exterior
                });
            } catch (err) {
                // Fallback final: Solo registramos un mensaje informativo
                console.warn('Utilizando onda por defecto:', videoUrl);
                if (isMounted) {
                    setWaveform(new Array(bars).fill(25).map(v => v + Math.random() * 10));
                    setIsLoading(false);
                }
            }
        };

        loadWaveform();
        return () => { isMounted = false; };
    }, [videoUrl, bars]);

    return { waveform, isLoading };
};
