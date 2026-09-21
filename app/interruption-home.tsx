"use client";

import { KeyboardEvent, PointerEvent, useMemo, useState } from "react";
import { SmartLink } from "./site-chrome";
import { services } from "./site-data";

const signals = [
  { word: "Clarity", line: "Make the point impossible to miss." },
  { word: "Desire", line: "Turn the right feeling into forward motion." },
  { word: "Trust", line: "Make every detail feel deliberately handled." },
  { word: "Momentum", line: "Give the idea somewhere useful to go." },
];

export function InterruptionHome() {
  const [held, setHeld] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeSignal, setActiveSignal] = useState(0);
  const currentService = useMemo(() => services[activeService], [activeService]);

  function move(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--interruption-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--interruption-y", y.toFixed(3));
  }

  function holdWithKeyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setHeld(true);
    }
  }

  return (
    <>
      <section
        className={`interruption-hero${held ? " is-held" : ""}`}
        aria-labelledby="interruption-title"
        onPointerMove={move}
      >
        <div className="interruption-noise" aria-hidden="true" />
        <div className="interruption-kicker">
          <span>Creative studio / Lagos + worldwide</span>
          <span>Strategy · Direction · Motion · Digital</span>
        </div>

        <div className="interruption-stage">
          <div className="interruption-copy">
            <p className="interruption-intro">We turn sharp thinking into brand worlds, campaigns and digital experiences that hold attention.</p>
            <h1 id="interruption-title">
              <span>Make them</span>
              <em>look</em>
              <span>twice.</span>
            </h1>
          </div>

          <figure className="interruption-portrait" role="img" aria-label="Editorial performer caught in a motion-frozen turn">
            {[0, 1, 2, 3, 4].map((slice) => <i className={`interruption-slice interruption-slice--${slice + 1}`} key={slice} />)}
            <figcaption><span>CP—001</span> The interruption / a live study in stopping power</figcaption>
          </figure>

          <button
            type="button"
            className="interruption-hold"
            aria-pressed={held}
            onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setHeld(true); }}
            onPointerUp={() => setHeld(false)}
            onPointerCancel={() => setHeld(false)}
            onLostPointerCapture={() => setHeld(false)}
            onKeyDown={holdWithKeyboard}
            onKeyUp={(event) => { if (event.key === " " || event.key === "Enter") setHeld(false); }}
            onBlur={() => setHeld(false)}
          >
            <span>{held ? "Held" : "Hold"}</span>
            <b>{held ? "Release the frame" : "Pause the noise"}</b>
            <i aria-hidden="true" />
          </button>

          <div className="interruption-coordinate" aria-hidden="true"><span>06.5244° N</span><span>03.3792° E</span></div>
        </div>

        <div className="interruption-foot">
          <SmartLink href="#signal">See the thinking <i>↘</i></SmartLink>
          <p>Not decoration. A demonstration.</p>
          <SmartLink href="/contact">Start a project <i>↗</i></SmartLink>
        </div>
      </section>

      <div className="kinetic-rail" aria-label="Creative Pie disciplines">
        <div>
          <span>Strategy that finds the angle</span><i>✦</i><span>Direction that creates a world</span><i>✦</i><span>Motion that earns attention</span><i>✦</i><span>Digital that rewards curiosity</span><i>✦</i>
          <span aria-hidden="true">Strategy that finds the angle</span><i aria-hidden="true">✦</i><span aria-hidden="true">Direction that creates a world</span><i aria-hidden="true">✦</i><span aria-hidden="true">Motion that earns attention</span><i aria-hidden="true">✦</i><span aria-hidden="true">Digital that rewards curiosity</span><i aria-hidden="true">✦</i>
        </div>
      </div>

      <section className="signal-section" id="signal">
        <div className="signal-label"><span>01 / The signal</span><p>What should people feel before they know why?</p></div>
        <div className="signal-stage" data-reveal>
          <p>We design for</p>
          <h2 aria-live="polite">{signals[activeSignal].word}<i>.</i></h2>
          <p>{signals[activeSignal].line}</p>
        </div>
        <div className="signal-switcher" role="tablist" aria-label="Desired brand response">
          {signals.map((signal, index) => (
            <button key={signal.word} type="button" role="tab" aria-selected={activeSignal === index} onClick={() => setActiveSignal(index)}>
              <span>0{index + 1}</span>{signal.word}
            </button>
          ))}
        </div>
      </section>

      <section className="switchboard-section" aria-labelledby="switchboard-title">
        <header>
          <span>02 / The switchboard</span>
          <h2 id="switchboard-title">One idea.<br /><em>Every output.</em></h2>
          <p>Pick a starting point. We connect the rest.</p>
        </header>
        <div className="service-switchboard">
          <div className="service-switchboard__list" role="tablist" aria-orientation="vertical" aria-label="Creative Pie services">
            {services.map((service, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeService === index}
                aria-controls="service-output"
                key={service.number}
                onClick={() => setActiveService(index)}
                onPointerEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
              >
                <span>{service.number}</span><strong>{service.title}</strong><i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
          <div className="service-output" id="service-output" role="tabpanel" key={currentService.number}>
            <span>Output / {currentService.number}</span>
            <div className="service-output__pulse" aria-hidden="true"><i /><i /><i /></div>
            <h3>{currentService.summary}</h3>
            <p>{currentService.detail}</p>
            <SmartLink href="/capabilities">Open capabilities <i>↗</i></SmartLink>
          </div>
        </div>
      </section>

      <section className="method-section">
        <div className="method-lead" data-reveal>
          <span>03 / How we move</span>
          <h2>Find the tension.<br />Build the world.<br /><em>Ship the feeling.</em></h2>
        </div>
        <div className="method-cards">
          <article data-reveal><span>01</span><h3>Cut through</h3><p>Find the sharpest truth in the brief and remove everything that weakens it.</p></article>
          <article data-reveal><span>02</span><h3>Build out</h3><p>Turn one central idea into language, image, motion, interface and behavior.</p></article>
          <article data-reveal><span>03</span><h3>Release well</h3><p>Make every touchpoint feel coherent, responsive and ready for the real world.</p></article>
        </div>
      </section>

      <section className="home-invitation" data-reveal>
        <span>04 / Your next move</span>
        <p>Bring us the ambition, the messy brief or the problem nobody has named properly yet.</p>
        <SmartLink href="/contact"><small>Start something</small><strong>Worth<br /><em>looking at.</em></strong><i>↗</i></SmartLink>
      </section>
    </>
  );
}
