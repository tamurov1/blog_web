import Link from "next/link";
import type { CSSProperties } from "react";
import type { LibraryBook } from "./books";

type LibraryShelfProps = {
  books: LibraryBook[];
};

type ShelfStyle = CSSProperties & {
  "--book-height": string;
  "--book-width": string;
  "--book-rotate": string;
};

const rowCount = 5;
const booksPerRow = 14;
const heightPattern = [76, 64, 84, 58, 72, 88, 68, 80, 60, 74];
const widthPattern = [26, 22, 30, 18, 34, 24, 20, 28, 36, 22];

function getBookStyle(index: number): ShelfStyle {
  const height = heightPattern[index % heightPattern.length];
  const width = widthPattern[index % widthPattern.length];
  const shouldLeanLeft = index % 9 === 2;
  const shouldLeanRight = index % 11 === 6;
  const rotate = shouldLeanLeft ? -14 : shouldLeanRight ? 14 : 0;

  return {
    "--book-height": `${height}px`,
    "--book-width": `${width}px`,
    "--book-rotate": `${rotate}deg`,
  };
}

function getShelfRows(books: LibraryBook[]) {
  const rows = Array.from({ length: rowCount }, () => [] as LibraryBook[]);

  books.forEach((book, index) => {
    const rowIndex = Math.min(Math.floor(index / booksPerRow), rowCount - 1);
    rows[rowIndex].push(book);
  });

  return rows;
}

export default function LibraryShelf({ books }: LibraryShelfProps) {
  const shelfRows = getShelfRows(books);

  return (
    <div className="library-shelf" aria-label="Library shelf">
      <div className="library-shelf-inner">
        {shelfRows.map((row, rowIndex) => (
          <div className="library-shelf-row" key={rowIndex}>
            <div className="library-shelf-books">
              {row.map((book, bookIndex) => {
                const absoluteIndex = rowIndex * booksPerRow + bookIndex;

                return (
                  <Link
                    aria-label={`${book.title} by ${book.author}`}
                    className="library-shelf-book"
                    href={`/library/${book.slug}`}
                    key={book.slug}
                    style={getBookStyle(absoluteIndex)}
                  >
                    <span className="library-shelf-tooltip">
                      <span>{book.title}</span>
                      <span>{book.author}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
