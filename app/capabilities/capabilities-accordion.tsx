"use client";

import { useState } from "react";
import { services } from "../site-data";

export function CapabilitiesAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="capability-list" id="service-index" aria-label="Creative Pie capabilities">
      {services.map((service, index) => {
        const expanded = open === index;
        const panelId = `capability-${service.number}`;
        const controlId = `${panelId}-control`;
        return (
          <article className={`capability-item${expanded ? " is-open" : ""}`} key={service.number}>
            <button
              id={controlId}
              className="capability-item__head"
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span>{service.number}</span>
              <h2 className="display">{service.title}</h2>
              <i aria-hidden="true">+</i>
            </button>
            <div
              id={panelId}
              className="capability-item__drawer"
              role="region"
              aria-labelledby={controlId}
              aria-hidden={!expanded}
            >
              <div className="capability-item__body"><p>{service.summary}</p><p>{service.detail}</p></div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
