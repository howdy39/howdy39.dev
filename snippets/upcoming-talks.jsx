// Shows only the talks whose date is today or later. The site is static, so the
// date check runs in the browser: past talks disappear on their own.
// Each talk is a wide row (thumbnail on the left, text on the right) so that a
// single upcoming talk still fills the width.
export const UpcomingTalks = ({ talks, role, cta, empty }) => {
  const today = () => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}/${mm}/${dd}`;
  };
  const [now, setNow] = useState(today());
  useEffect(() => {
    setNow(today());
  }, []);

  const upcoming = talks.filter((t) => t.date >= now);
  if (upcoming.length === 0) {
    return <p>{empty}</p>;
  }
  return (
    <div className="not-prose flex flex-col gap-4 my-4">
      {upcoming.map((t) => (
        <a
          key={t.href}
          href={t.href}
          style={{ borderBottom: "none" }}
          className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border border-gray-950/10 dark:border-white/10 hover:border-primary dark:hover:border-primary-light transition-colors"
        >
          {t.img ? (
            <img
              src={t.img}
              alt=""
              className="w-full sm:w-56 sm:shrink-0 rounded-xl m-0"
              style={{ aspectRatio: "1200 / 630", objectFit: "cover" }}
            />
          ) : null}
          <div className="min-w-0">
            <div className="font-semibold text-base text-gray-800 dark:text-white">{t.title}</div>
            <div className="mt-1 text-gray-500 dark:text-gray-400">
              {t.date} · {role}
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary-light">
              {cta} →
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
