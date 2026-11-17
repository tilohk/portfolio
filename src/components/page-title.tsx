export function PageTitle({
  children,
  intro,
}: {
  children: React.ReactNode;
  intro?: string;
}) {
  return (
    <header>
      <h1 className="text-3xl font-extrabold tracking-[0.08em] text-plum uppercase font-stretch-expanded lg:text-5xl">
        {children}
      </h1>
      {intro && <p className="mt-4 max-w-prose text-lg">{intro}</p>}
    </header>
  );
}
