import * as runtime from "react/jsx-runtime";
import { ImageLightbox } from "@/components/image-lightbox";
import { formatDate } from "@/lib/dates";

type MdxModule = { default: (props: object) => React.ReactNode };

// Markdown images aren't imported, so next/image can't optimize them. Their size comes
// from velite.config.ts and reserves their space while they load.
function MdxImage({
  src = "",
  alt = "",
  width,
  height,
}: {
  src?: string;
  alt?: string;
  // Compiled MDX passes them as strings.
  width?: string;
  height?: string;
}) {
  return (
    <ImageLightbox src={src} alt={alt}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="h-auto"
      />
    </ImageLightbox>
  );
}

// `player` is the album ID from Bandcamp's Share / Embed code.
function Album({
  player,
  title,
  label,
  released,
  url,
  children,
}: {
  player: string;
  title: string;
  label: string;
  released: string;
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <iframe
        src={`https://bandcamp.com/EmbeddedPlayer/album=${player}/size=large/artwork=small/tracklist=false/transparent=true/`}
        title={`Bandcamp player: ${title}`}
        loading="lazy"
        className="h-[120px] w-full"
      />
      <p className="text-base text-ink/75">
        {label} · {formatDate(released)} · <a href={url}>Bandcamp</a>
      </p>
      {children}
    </div>
  );
}

// Velite compiles MDX at build time to a function body. Evaluating it yields the MDX
// function, which uses no hooks, so it is called directly instead of mounted as a component.
function renderMdx(code: string) {
  const mdx = new Function(code)({ ...runtime }) as MdxModule;
  return mdx.default({ components: { img: MdxImage, Album } });
}

export function MdxContent({ code }: { code: string }) {
  return (
    <div className="max-w-prose space-y-4 text-lg leading-relaxed [&_a]:underline [&_h2]:mt-10 [&_h2]:text-sm [&_h2]:tracking-[0.25em] [&_h2]:text-teal [&_h2]:uppercase [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-semibold [&>h2:first-child]:mt-0">
      {renderMdx(code)}
    </div>
  );
}
