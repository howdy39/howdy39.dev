// Shows only the talks whose date is today or later. The site is static, so the
// date check runs in the browser: past talks disappear on their own.
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
    <CardGroup cols={2}>
      {upcoming.map((t) => (
        <Card key={t.href} title={t.title} img={t.img} href={t.href} cta={cta} arrow="true">
          {t.date} · {role}
        </Card>
      ))}
    </CardGroup>
  );
};
