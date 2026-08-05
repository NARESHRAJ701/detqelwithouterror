import React from 'react';
import { ShieldCheck, Cpu, Play, BarChart3 } from 'lucide-react';

interface MockupCanvasProps {
  type: 'custom-image' | 'analytics' | 'ai-studio' | '3d-canvas' | 'financial';
  accentColor?: string;
  imageSrc?: string;
  title?: string;
}

export const MockupCanvas: React.FC<MockupCanvasProps> = ({ type, imageSrc, title }) => {
  if (type === 'custom-image' || imageSrc) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-black/90 group select-none flex items-center justify-center">
        {/* Render Image */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title || 'Project Preview'}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-neutral-900 to-black flex items-center justify-center text-white/50 font-mono text-sm">
            [PREVIEW_RENDER_HOST]
          </div>
        )}

        {/* HUD Engineering Annotations Overlay */}
        <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between z-10 font-mono text-[10px] text-white/80">
          <div className="flex justify-between items-center bg-black/40 backdrop-blur-xs px-2.5 py-1 border border-white/10 rounded-xs">
            <span className="flex items-center gap-1.5 text-accent-acid font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-acid animate-ping" />
              DETQEL_RAW_RENDER // {title ? title.toUpperCase() : 'PREVIEW'}
            </span>
            <span className="opacity-60 text-white font-mono">ASSET_RES: 3840x2160 // 60FPS</span>
          </div>

          {/* Corner Framing Markers */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-accent-acid/80" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-accent-acid/80" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-accent-acid/80" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-accent-acid/80" />

          <div className="flex justify-between items-center bg-black/40 backdrop-blur-xs px-2.5 py-1 border border-white/10 rounded-xs mt-auto">
            <span className="text-white/60">COLOR_SPACE: Rec.709</span>
            <span className="text-accent-acid font-bold font-pixel">CASE_STUDY_STAGE_01</span>
          </div>
        </div>
      </div>
    );
  }
  if (type === '3d-canvas') {
    return (
      <div className="w-full h-full bg-[#09090D] p-6 text-white font-mono flex flex-col justify-between relative overflow-hidden select-none">
        {/* Engineering Grid Shader Background */}
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />

        {/* Top Control Bar */}
        <div className="flex justify-between items-center z-10 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-acid animate-ping" />
            <span className="font-bold text-accent-acid">KINEX_RENDER_CORE_v3.4</span>
          </div>
          <div className="flex gap-2 text-[10px] bg-white/10 px-2 py-1 rounded">
            <span>FPS: 60.0</span>
            <span>SHADERS: 12</span>
            <span>VERTICES: 124K</span>
          </div>
        </div>

        {/* Center 3D Spatial Wireframe Illusion */}
        <div className="my-auto py-8 text-center relative z-10">
          <div className="w-36 h-36 mx-auto relative flex items-center justify-center">
            {/* Outer Rotating Square */}
            <div className="absolute inset-0 border-2 border-accent-acid/40 rounded animate-spin-slow" />
            {/* Inner Rotating Rhombus */}
            <div className="absolute inset-2 border-2 border-accent-coral/60 rotate-45 animate-spin" style={{ animationDuration: '8s' }} />
            {/* Core Glowing Orb */}
            <div className="w-12 h-12 bg-accent-acid rounded-full blur-md opacity-70 animate-pulse" />
            <div className="absolute font-pixel text-xs text-black font-bold bg-accent-acid px-1 rounded">
              GLSL
            </div>
          </div>
          <p className="text-xs text-white/60 mt-4 tracking-widest uppercase font-mono">
            Spatial Wireframe Timeline [Raymarched]
          </p>
        </div>

        {/* Bottom Node Controls */}
        <div className="flex justify-between items-center z-10 border-t border-white/10 pt-3 text-[11px] text-white/70">
          <div className="flex items-center gap-2">
            <Play className="w-3.5 h-3.5 text-accent-acid" />
            <span>PLAY TIMELINE</span>
          </div>
          <div className="flex gap-3">
            <span>X: 0.442</span>
            <span>Y: 1.092</span>
            <span>Z: -0.118</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'financial') {
    return (
      <div className="w-full h-full bg-[#0F172A] p-6 text-white font-mono flex flex-col justify-between relative overflow-hidden select-none">
        {/* Top Header */}
        <div className="flex justify-between items-center border-b border-slate-700 pb-3 z-10">
          <div className="flex items-center gap-2 font-bold text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> NUDGE TREASURY OS
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-bold border border-emerald-500/30">
            REAL-TIME SETTLED
          </span>
        </div>

        {/* Financial Sparklines */}
        <div className="my-auto py-4 space-y-4 z-10">
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>GLOBAL LIQUIDITY POOL</span>
              <span className="text-emerald-400 font-bold">$2,410,950,000 (+14.2%)</span>
            </div>
            {/* Sparkline Visual */}
            <div className="h-12 w-full flex items-end gap-1.5 pt-2">
              {[40, 55, 35, 70, 85, 60, 95, 80, 100, 90, 110, 125, 115, 140].map((h, idx) => (
                <div
                  key={idx}
                  style={{ height: `${(h / 140) * 100}%` }}
                  className="flex-1 bg-gradient-to-t from-emerald-600 to-accent-coral rounded-xs hover:brightness-125 transition-all"
                />
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
            <div className="bg-slate-800/60 p-2 rounded border border-slate-700">
              <div className="text-[9px] text-slate-400">LATENCY</div>
              <div className="font-bold text-white">3.8 ms</div>
            </div>
            <div className="bg-slate-800/60 p-2 rounded border border-slate-700">
              <div className="text-[9px] text-slate-400">FX PAIRS</div>
              <div className="font-bold text-white">48 Active</div>
            </div>
            <div className="bg-slate-800/60 p-2 rounded border border-slate-700">
              <div className="text-[9px] text-slate-400">HEALTH</div>
              <div className="font-bold text-emerald-400">100.0%</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-slate-700 pt-3 text-[10px] text-slate-400">
          <span>SECURED BY STRIPE VAULT</span>
          <span>STATION: ZURICH HQ</span>
        </div>
      </div>
    );
  }

  if (type === 'ai-studio') {
    return (
      <div className="w-full h-full bg-[#0D1117] p-6 text-white font-mono flex flex-col justify-between relative overflow-hidden select-none">
        {/* Node Graph Mockup */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-3 z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
            <Cpu className="w-4 h-4 text-sky-400" /> HYPER_AGENT_TOPOLOGY
          </div>
          <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded">
            12 AGENTS ACTIVE
          </span>
        </div>

        {/* Interactive Node Topology Representation */}
        <div className="my-auto py-6 relative z-10 flex items-center justify-center">
          <div className="w-full max-w-sm space-y-3">
            <div className="flex items-center justify-between bg-gray-900/80 p-3 rounded border border-gray-700 shadow">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-xs font-bold text-white">Agent_01: Reasoning Kernel</span>
              </div>
              <span className="text-[10px] text-sky-300 font-pixel">99.8% ACC</span>
            </div>

            <div className="w-0.5 h-4 bg-sky-400/40 mx-auto" />

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-900/80 p-3 rounded border border-gray-700 text-center">
                <span className="text-[10px] text-gray-400">Agent_02 (Coder)</span>
                <div className="text-xs font-bold text-emerald-400 mt-1">GENERATE_TS</div>
              </div>
              <div className="bg-gray-900/80 p-3 rounded border border-gray-700 text-center">
                <span className="text-[10px] text-gray-400">Agent_03 (Tester)</span>
                <div className="text-xs font-bold text-accent-coral mt-1">VERIFY_AST</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-gray-800 pt-3 text-[10px] text-gray-400">
          <span>GRAPH ID: #9042-HYPER</span>
          <span>LATENCY: 12ms</span>
        </div>
      </div>
    );
  }

  // Analytics Streamgraph Mockup
  return (
    <div className="w-full h-full bg-[#120E16] p-6 text-white font-mono flex flex-col justify-between relative overflow-hidden select-none">
      <div className="flex justify-between items-center border-b border-purple-900/50 pb-3 z-10">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
          <BarChart3 className="w-4 h-4 text-purple-400" /> AURA CULTURAL TELEMETRY
        </div>
        <span className="text-[10px] bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded font-pixel">
          LIVE FEED
        </span>
      </div>

      <div className="my-auto py-6 z-10 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[10px] text-purple-300/60 uppercase">SENTIMENT HEATMAP SCORE</div>
            <div className="text-2xl font-pixel font-bold text-accent-purple">98.4 / 100</div>
          </div>
          <div className="text-right text-xs text-purple-300">
            <span>PARIS / TOKYO / NY</span>
          </div>
        </div>

        {/* Wave graphic */}
        <div className="h-16 w-full flex items-center justify-between gap-1">
          {[20, 45, 60, 80, 95, 70, 85, 100, 75, 90, 65, 85, 95, 110].map((val, i) => (
            <div
              key={i}
              style={{ height: `${val}%` }}
              className="flex-1 bg-gradient-to-t from-purple-900 via-accent-purple to-pink-400 rounded-t-sm"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-purple-900/50 pt-3 text-[10px] text-purple-400">
        <span>DATA STREAM: ACTIVE</span>
        <span>50M EVENTS/SEC</span>
      </div>
    </div>
  );
};
