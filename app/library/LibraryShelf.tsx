import type { CSSProperties } from "react";

type ShelfItem =
  | { kind: "book"; height: number; width?: number; rotate?: number }
  | { kind: "stack"; widths: number[] }
  | { kind: "space"; width: number };

type ShelfStyle = CSSProperties & {
  "--book-height"?: string;
  "--book-width"?: string;
  "--book-rotate"?: string;
  "--space-width"?: string;
};

const shelfRows: ShelfItem[][] = [
  [
    { kind: "book", height: 68 },
    { kind: "book", height: 68 },
    { kind: "book", height: 68 },
    { kind: "book", height: 52 },
    { kind: "book", height: 52 },
    { kind: "book", height: 76, width: 18 },
    { kind: "space", width: 24 },
    { kind: "stack", widths: [118, 94] },
    { kind: "space", width: 18 },
    { kind: "book", height: 50 },
    { kind: "book", height: 74, width: 20 },
    { kind: "book", height: 50 },
    { kind: "book", height: 66, rotate: 18 },
  ],
  [
    { kind: "book", height: 68, rotate: -21 },
    { kind: "book", height: 78, rotate: -17 },
    { kind: "space", width: 32 },
    { kind: "stack", widths: [136, 102, 102] },
    { kind: "space", width: 24 },
    { kind: "book", height: 76 },
    { kind: "book", height: 84 },
    { kind: "book", height: 82, width: 18 },
    { kind: "book", height: 82, width: 18 },
    { kind: "space", width: 16 },
    { kind: "stack", widths: [104, 104] },
    { kind: "book", height: 68, rotate: 18 },
  ],
  [
    { kind: "stack", widths: [112, 112] },
    { kind: "space", width: 18 },
    { kind: "book", height: 76, width: 18 },
    { kind: "book", height: 76, width: 18 },
    { kind: "space", width: 14 },
    { kind: "stack", widths: [126, 96] },
    { kind: "book", height: 68, rotate: 21 },
    { kind: "book", height: 68 },
    { kind: "book", height: 68 },
    { kind: "book", height: 54 },
    { kind: "book", height: 54 },
    { kind: "book", height: 76, width: 18 },
  ],
  [
    { kind: "book", height: 70 },
    { kind: "book", height: 78, width: 42 },
    { kind: "book", height: 70, width: 22 },
    { kind: "book", height: 54, width: 24 },
    { kind: "book", height: 54, width: 24 },
    { kind: "book", height: 78, width: 18 },
    { kind: "book", height: 78, width: 18 },
    { kind: "book", height: 77, width: 42 },
    { kind: "book", height: 68, width: 24 },
    { kind: "book", height: 52, width: 28 },
    { kind: "book", height: 52, width: 28 },
    { kind: "book", height: 52, width: 28 },
    { kind: "book", height: 52, width: 28 },
    { kind: "book", height: 76, width: 20 },
  ],
  [
    { kind: "stack", widths: [130, 104, 104, 76] },
    { kind: "book", height: 92, width: 42 },
    { kind: "book", height: 92, width: 22, rotate: -16 },
    { kind: "book", height: 70, width: 44 },
    { kind: "book", height: 60, width: 20 },
    { kind: "book", height: 60, width: 20 },
    { kind: "book", height: 58, width: 20, rotate: 18 },
    { kind: "book", height: 58, width: 20 },
    { kind: "book", height: 68, width: 18 },
    { kind: "book", height: 48, width: 24 },
  ],
];

function renderItem(item: ShelfItem, rowIndex: number, itemIndex: number) {
  if (item.kind === "space") {
    return (
      <span
        aria-hidden="true"
        className="library-shelf-space"
        key={`${rowIndex}-${itemIndex}`}
        style={{ "--space-width": `${item.width}px` } as ShelfStyle}
      />
    );
  }

  if (item.kind === "stack") {
    return (
      <span className="library-shelf-stack" key={`${rowIndex}-${itemIndex}`}>
        {item.widths.map((width, stackIndex) => (
          <span
            aria-hidden="true"
            className="library-shelf-book library-shelf-book-horizontal"
            key={`${rowIndex}-${itemIndex}-${stackIndex}`}
            style={{ "--book-width": `${width}px` } as ShelfStyle}
          />
        ))}
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="library-shelf-book"
      key={`${rowIndex}-${itemIndex}`}
      style={
        {
          "--book-height": `${item.height}px`,
          "--book-width": `${item.width ?? 28}px`,
          "--book-rotate": `${item.rotate ?? 0}deg`,
        } as ShelfStyle
      }
    />
  );
}

export default function LibraryShelf() {
  return (
    <div className="library-shelf" aria-label="Minimal shelf illustration">
      <div className="library-shelf-inner">
        {shelfRows.map((row, rowIndex) => (
          <div className="library-shelf-row" key={rowIndex}>
            <div className="library-shelf-books">
              {row.map((item, itemIndex) => renderItem(item, rowIndex, itemIndex))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
