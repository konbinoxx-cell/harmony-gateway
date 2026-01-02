import { useEffect, useRef, useState } from "react";

export default function App() {
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const bufferRef = useRef(null);

  const [running, setRunning] = useState(false);
  const [frequency, setFrequency] = useState(null);

  async function startAudio() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();

    analyser.fftSize = 2048;

    const buffer = new Float32Array(analyser.fftSize);

    source.connect(analyser);

    audioCtxRef.current = audioCtx;
    analyserRef.current = analyser;
    bufferRef.current = buffer;

    setRunning(true);
    detect();
  }

  function detect() {
    if (!analyserRef.current) return;

    analyserRef.current.getFloatTimeDomainData(bufferRef.current);

    const freq = autoCorrelate(bufferRef.current, audioCtxRef.current.sampleRate);
    if (freq !== -1) setFrequency(freq);

    requestAnimationFrame(detect);
  }

  return (
    <div style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>🎵 Harmony Gateway</h1>

      {!running && (
        <button onClick={startAudio} style={{ fontSize: 20 }}>
          🎤 启动音频引擎
        </button>
      )}

      {running && (
        <>
          <p>音频引擎运行中</p>
          <p>
            当前频率：
            <strong>
              {frequency ? frequency.toFixed(1) + " Hz" : "—"}
            </strong>
          </p>
        </>
      )}
    </div>
  );
}

/**
 * Autocorrelation pitch detection
 * 返回 Hz 或 -1
 */
function autoCorrelate(buffer, sampleRate) {
  let SIZE = buffer.length;
  let rms = 0;

  for (let i = 0; i < SIZE; i++) {
    let val = buffer[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1; // 静音过滤

  let r1 = 0, r2 = SIZE - 1;
  while (buffer[r1] < 0.01 && r1 < SIZE / 2) r1++;
  while (buffer[r2] < 0.01 && r2 > SIZE / 2) r2--;

  buffer = buffer.slice(r1, r2);
  SIZE = buffer.length;

  let c = new Array(SIZE).fill(0);
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) {
      c[i] += buffer[j] * buffer[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;
  let maxval = -1, maxpos = -1;
  for (let i = d; i < SIZE; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }

  let T0 = maxpos;
  return sampleRate / T0;
}
