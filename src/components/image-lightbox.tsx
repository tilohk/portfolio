"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

function openModal(dialog: HTMLDialogElement | null) {
  if (dialog && !dialog.open) dialog.showModal();
}

// Wraps an image in a link to its full-size file, so it still opens without JavaScript.
// With JavaScript, the link opens a modal dialog instead, where a click toggles zoom.
// The dialog is portaled to <body> because Markdown images sit inside a <p>.
export function ImageLightbox({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <a
        href={src}
        className="block cursor-zoom-in"
        onClick={(event) => {
          event.preventDefault();
          setZoomed(false);
          setOpen(true);
        }}
      >
        {children}
      </a>
      {open &&
        createPortal(
          <dialog
            ref={openModal}
            aria-label={alt}
            onClose={() => setOpen(false)}
            // A click on the backdrop lands on the dialog itself.
            onClick={(event) => {
              if (event.target === event.currentTarget)
                event.currentTarget.close();
            }}
            className="m-0 flex h-dvh max-h-none w-dvw max-w-none overflow-auto bg-transparent p-4 backdrop:bg-ink"
          >
            <form method="dialog">
              <button
                type="submit"
                className="fixed top-4 right-4 z-10 bg-cream px-3 py-1 text-sm tracking-[0.2em] uppercase"
              >
                Close
              </button>
            </form>
            <button
              type="button"
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
              onClick={() => setZoomed(!zoomed)}
              className={`m-auto shrink-0 ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
            >
              {/* The original file, so zooming shows its real resolution. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className={
                  zoomed
                    ? "max-w-none"
                    : "max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)]"
                }
              />
            </button>
          </dialog>,
          document.body,
        )}
    </>
  );
}
