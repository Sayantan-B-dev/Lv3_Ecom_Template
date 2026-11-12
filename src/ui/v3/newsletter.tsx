"use client";

import { useState } from "react";
import { nocturneContent } from "@/config/content";

export function V3Newsletter() {
  const [done, setDone] = useState(false);
  const copy = nocturneContent.newsletter;

  return (
    <form
      className="v3-news"
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="v3-news-email" className="visually-hidden">
        {copy.label}
      </label>
      <input
        id="v3-news-email"
        className="v3-news-input"
        type="email"
        name="email"
        autoComplete="email"
        placeholder={copy.placeholder}
        required
      />
      <button type="submit" className="btn btn-accent btn-sm">
        {done ? copy.done : copy.cta}
      </button>
      <p className="v3-news-note" role="status">
        {done ? copy.thanks : copy.note}
      </p>
    </form>
  );
}
