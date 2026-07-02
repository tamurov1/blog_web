"use client";

import { useState } from "react";
import { deleteLibraryBookAction } from "./actions";

type DeleteLibraryBookButtonProps = {
  slug: string;
  title: string;
};

export default function DeleteLibraryBookButton({
  slug,
  title,
}: DeleteLibraryBookButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="plain-button delete-link"
        type="button"
        onClick={() => setOpen(true)}
      >
        Delete
      </button>

      {open ? (
        <div
          className="confirm-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div
            aria-labelledby={`delete-book-${slug}`}
            aria-modal="true"
            className="confirm-dialog"
            role="dialog"
          >
            <p id={`delete-book-${slug}`}>Do you really want to delete this book?</p>
            <p className="confirm-title">{title}</p>

            <div className="confirm-actions">
              <form action={deleteLibraryBookAction}>
                <input type="hidden" name="slug" value={slug} />
                <button className="confirm-delete" type="submit">
                  Yes
                </button>
              </form>
              <button
                className="confirm-cancel"
                type="button"
                onClick={() => setOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
