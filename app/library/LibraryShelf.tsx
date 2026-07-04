import type { CSSProperties } from "react";

const shelfRows = [
  [34, 42, 30, 48, 38, 44, 32],
  [46, 34, 40, 30, 50, 36, 42],
];

export default function LibraryShelf() {
  return (
    <div className="library-shelf" aria-label="Minimal shelf illustration">
      {shelfRows.map((row, rowIndex) => (
        <div className="library-shelf-row" key={rowIndex}>
          <div className="library-shelf-books">
            {row.map((height, bookIndex) => (
              <button
                aria-label={`Shelf book ${rowIndex * row.length + bookIndex + 1}`}
                className="library-shelf-book"
                key={`${rowIndex}-${bookIndex}`}
                style={{ "--book-height": `${height}px` } as CSSProperties}
                type="button"
              />
            ))}
          </div>
          <span className="library-shelf-board" />
        </div>
      ))}
    </div>
  );
}
