// Web Audio API Micro-Synth for UI Sound Effects (No external assets required)

class SoundFX {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setEnabled(enable: boolean) {
    this.enabled = enable;
  }

  public isSoundEnabled(): boolean {
    return this.enabled;
  }

  // Subtle pop / click sound
  public playClick() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // High soft tick on hover
  public playHover() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.03);
  }

  // Fun synth blip on action / sticker drop / copy
  public playSuccess() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.12); // G5

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(now + 0.26);
  }
  // Realistic projector power-on sound (heavy relay click + rising fan whir)
  public playProjectorOn() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Heavy mechanical switch click
    const oscClick = this.ctx.createOscillator();
    const gainClick = this.ctx.createGain();
    oscClick.type = 'square';
    oscClick.frequency.setValueAtTime(150, now);
    oscClick.frequency.exponentialRampToValueAtTime(40, now + 0.08);
    gainClick.gain.setValueAtTime(0.25, now);
    gainClick.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    oscClick.connect(gainClick);
    gainClick.connect(this.ctx.destination);
    oscClick.start(now);
    oscClick.stop(now + 0.09);

    // Rising fan & lamp hum
    const oscFan = this.ctx.createOscillator();
    const gainFan = this.ctx.createGain();
    oscFan.type = 'sawtooth';
    oscFan.frequency.setValueAtTime(60, now + 0.05);
    oscFan.frequency.exponentialRampToValueAtTime(180, now + 0.8);
    gainFan.gain.setValueAtTime(0.001, now + 0.05);
    gainFan.gain.linearRampToValueAtTime(0.06, now + 0.4);
    gainFan.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    oscFan.connect(gainFan);
    gainFan.connect(this.ctx.destination);
    oscFan.start(now + 0.05);
    oscFan.stop(now + 1.25);
  }

  // Realistic thermal POS printer paper feeding sound (motor ticks + paper buzz)
  public playPrinterSound() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Rapid motor stepper clicks / ticks for thermal printing
    for (let i = 0; i < 14; i++) {
      const tickTime = now + i * 0.11;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(380 + (i % 4) * 60, tickTime);
      osc.frequency.exponentialRampToValueAtTime(140, tickTime + 0.05);

      gain.gain.setValueAtTime(0.09, tickTime);
      gain.gain.exponentialRampToValueAtTime(0.001, tickTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(tickTime);
      osc.stop(tickTime + 0.06);
    }
  }

  // Realistic projector power-off sound (clunk + fan spin down)
  public playProjectorOff() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    const oscClick = this.ctx.createOscillator();
    const gainClick = this.ctx.createGain();
    oscClick.type = 'sine';
    oscClick.frequency.setValueAtTime(220, now);
    oscClick.frequency.exponentialRampToValueAtTime(60, now + 0.12);
    gainClick.gain.setValueAtTime(0.2, now);
    gainClick.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    oscClick.connect(gainClick);
    gainClick.connect(this.ctx.destination);
    oscClick.start(now);
    oscClick.stop(now + 0.13);
  }
}

export const sound = new SoundFX();
