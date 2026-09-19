/**
 * BajoTerra: Motor de Audio Procedural (Web Audio API)
 * Efectos de sonido y sintetizador ambiental sin archivos de audio externos.
 */

const SoundEngine = (function () {
  let ctx = null;
  let muted = false;
  let ambientOsc = null;
  let ambientGain = null;
  let isAmbientPlaying = false;

  function init() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        ctx = new AudioCtx();
      }
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
  }

  function isMuted() {
    return muted;
  }

  function toggleMute() {
    muted = !muted;
    if (muted && ambientGain) {
      ambientGain.gain.setValueAtTime(0, ctx ? ctx.currentTime : 0);
    } else if (!muted && ambientGain && ctx) {
      ambientGain.gain.setValueAtTime(0.04, ctx.currentTime);
    }
    return muted;
  }

  // Blaster Disparo (Lanzadora)
  function playBlasterShot() {
    if (muted) return;
    init();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.22);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.23);
  }

  // Aceleración a 100 MPH (Silbido de velocidad)
  function playSpeedBurst() {
    if (muted) return;
    init();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.35);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.39);
  }

  // Rugido de Transformación a Velocimorfo
  function playTransformRoar() {
    if (muted) return;
    init();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Oscilador de potencia grave
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(120, now);
    osc1.frequency.exponentialRampToValueAtTime(320, now + 0.15);
    osc1.frequency.exponentialRampToValueAtTime(180, now + 0.4);

    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.46);

    // Resonancia de energía
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(450, now);
    osc2.frequency.exponentialRampToValueAtTime(900, now + 0.2);

    gain2.gain.setValueAtTime(0.12, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(now);
    osc2.stop(now + 0.32);
  }

  // Impacto / Explosión elemental
  function playImpact(isCrit = false) {
    if (muted) return;
    init();
    if (!ctx) return;

    const now = ctx.currentTime;
    const dur = isCrit ? 0.45 : 0.28;

    // Ruido blanco filtrado para explosión
    const bufferSize = ctx.sampleRate * dur;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isCrit ? 600 : 350, now);
    filter.frequency.exponentialRampToValueAtTime(50, now + dur);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(isCrit ? 0.45 : 0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + dur + 0.05);
  }

  // Curación (Doc / Sanadora)
  function playHeal() {
    if (muted) return;
    init();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.15, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.36);
    });
  }

  // Interacción UI / Click
  function playClick() {
    if (muted) return;
    init();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.06);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  // Fanfarria de Victoria
  function playVictory() {
    if (muted) return;
    init();
    if (!ctx) return;

    const now = ctx.currentTime;
    const chord = [392.00, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.18, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.82);
    });
  }

  // Sonido de Derrota
  function playDefeat() {
    if (muted) return;
    init();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [440, 415.3, 392, 369.99];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.18);

      gain.gain.setValueAtTime(0.15, now + idx * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.18);
      osc.stop(now + idx * 0.18 + 0.42);
    });
  }

  // Sonido Ambiental de Caverna (Zumbido místico)
  function startAmbient() {
    if (isAmbientPlaying || muted) return;
    init();
    if (!ctx) return;

    try {
      ambientOsc = ctx.createOscillator();
      ambientGain = ctx.createGain();

      ambientOsc.type = 'sine';
      ambientOsc.frequency.setValueAtTime(65, ctx.currentTime);

      ambientGain.gain.setValueAtTime(muted ? 0 : 0.035, ctx.currentTime);

      ambientOsc.connect(ambientGain);
      ambientGain.connect(ctx.destination);

      ambientOsc.start();
      isAmbientPlaying = true;
    } catch (e) {
      console.warn('No se pudo iniciar el audio ambiental:', e);
    }
  }

  return {
    init,
    isMuted,
    toggleMute,
    playBlasterShot,
    playSpeedBurst,
    playTransformRoar,
    playImpact,
    playHeal,
    playClick,
    playVictory,
    playDefeat,
    startAmbient
  };
})();

if (typeof window !== 'undefined') {
  window.SoundEngine = SoundEngine;
}
