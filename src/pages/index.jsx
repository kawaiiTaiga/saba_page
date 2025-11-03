import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="space-y-8">
          <h2 className="text-6xl font-bold leading-tight">
            Project SABA
          </h2>
          <p className="text-xl max-w-2xl border-l-4 border-black pl-4">
            Peripherals for LLM.
          </p>
          <div className="flex gap-4 pt-4">
            <a
              href="https://github.com/kawaiiTaiga/project_SABA"
              target="_blank" rel="noreferrer"
              className="px-8 py-4 bg-black text-white font-bold border-4 border-black hover:bg-white hover:text-black transition-colors"
            >
              Github
            </a>
            <a
              href="https://www.youtube.com/@%EA%B0%9C%EB%B0%9C%EC%9A%A9%EA%B3%84%EC%A0%95-i8p"
              target="_blank" rel="noreferrer"
              className="px-8 py-4 bg-white text-black font-bold border-4 border-black hover:bg-black hover:text-white transition-colors"
            >
              Youtube
            </a>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/docs" className="border-4 border-black p-5 hover:-translate-y-0.5 transition-transform">
            <h3 className="font-bold text-lg">DOCUMENT</h3>
            <p className="mt-2 text-sm">Install, configure, and run SABA with your hardware.</p>
          </a>
          <a href="/stuffs" className="border-4 border-black p-5 hover:-translate-y-0.5 transition-transform">
            <h3 className="font-bold text-lg">STUFFS</h3>
            <p className="mt-2 text-sm">What I made.</p>
          </a>
          <a href="/blog" className="border-4 border-black p-5 hover:-translate-y-0.5 transition-transform">
            <h3 className="font-bold text-lg">BULLSHIT</h3>
            <p className="mt-2 text-sm">Casual posts and thoughts from development.(In Preparation)</p>
          </a>
        </div>
      </section>
    </div>
  );
}
