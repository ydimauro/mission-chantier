type PlaceholderSectionProps = {
  title: string;
  body: string;
};

export function PlaceholderSection({ title, body }: PlaceholderSectionProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold text-ink">{title}</h1>
      <p className="mt-4 text-base leading-7 text-ink-muted">{body}</p>
    </div>
  );
}
