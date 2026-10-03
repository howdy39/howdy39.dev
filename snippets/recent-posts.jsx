// The latest posts on the home page. Same look as a Mintlify Card with an image,
// but the image has explicit width/height so it does not shift the layout while it loads.
export const RecentPosts = ({ posts }) => (
  <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
    {posts.map((p) => (
      <a
        key={p.href}
        href={p.href}
        className="group flex flex-col overflow-hidden rounded-2xl border border-gray-950/10 dark:border-white/10 hover:border-primary dark:hover:border-primary-light transition-colors"
      >
        <img
          src={p.img}
          alt=""
          width={1280}
          height={670}
          loading="lazy"
          decoding="async"
          className="w-full m-0 object-cover"
          style={{ aspectRatio: "1280 / 670" }}
        />
        <div className="flex items-start justify-between gap-3 p-4">
          <div className="min-w-0">
            <div className="font-semibold text-base text-gray-800 dark:text-white">{p.title}</div>
            <div className="mt-1 text-gray-500 dark:text-gray-400">
              {p.date} · {p.source}
            </div>
          </div>
          <span
            aria-hidden="true"
            className="text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary-light"
          >
            ↗
          </span>
        </div>
      </a>
    ))}
  </div>
);
