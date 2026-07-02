import type { Comment } from "@/lib/commentStore";
import { createLibraryCommentAction } from "./actions";

type CommentsProps = {
  comments: Comment[];
  message?: string;
  slug: string;
};

const formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatTimestamp(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return formatter.format(date);
}

export default function Comments({ comments, message, slug }: CommentsProps) {
  return (
    <section className="comments-section" id="comments" aria-labelledby="comments-title">
      <h2 id="comments-title">Comments</h2>

      <form className="comment-form" action={createLibraryCommentAction}>
        <input type="hidden" name="slug" value={slug} />
        <label className="comment-honeypot">
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <label>
          Name
          <input
            name="username"
            type="text"
            maxLength={80}
            placeholder="Anonymous"
            autoComplete="name"
          />
        </label>
        <label>
          Comment
          <textarea name="body" rows={5} maxLength={2000} required />
        </label>
        <button className="comment-submit" type="submit">
          Add
        </button>
      </form>

      {message === "added" ? <p className="comment-message">Comment added.</p> : null}
      {message === "invalid" ? (
        <p className="comment-message">Write a comment before posting.</p>
      ) : null}

      <div className="comment-list">
        {comments.length === 0 ? (
          <p className="comment-empty">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <article className="comment" key={comment.id}>
              <p className="comment-author">{comment.username}</p>
              <p className="comment-body">{comment.body}</p>
              <time className="comment-time" dateTime={comment.createdAt}>
                {formatTimestamp(comment.createdAt)}
              </time>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
