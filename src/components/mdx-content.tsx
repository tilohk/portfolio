import * as runtime from "react/jsx-runtime";
import { ImageLightbox } from "@/components/image-lightbox";

type MdxModule = { default: (props: object) => React.ReactNode };

// Markdown images only carry src and alt, so next/image can't size them.
function MdxImage({ src = "", alt = "" }: { src?: string; alt?: string }) {
  return (
    <ImageLightbox src={src} alt={alt}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </ImageLightbox>
  );
}

// Velite compiles MDX at build time to a function body. Evaluating it yields the MDX
// function, which uses no hooks, so it is called directly instead of mounted as a component.
function renderMdx(code: string) {
  const mdx = new Function(code)({ ...runtime }) as MdxModule;
  return mdx.default({ components: { img: MdxImage } });
}

export function MdxContent({ code }: { code: string }) {
  return (
    <div className="max-w-prose space-y-4 text-lg leading-relaxed [&_a]:underline [&_h2]:mt-10 [&_h2]:text-sm [&_h2]:tracking-[0.25em] [&_h2]:text-teal [&_h2]:uppercase [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-semibold [&>h2:first-child]:mt-0">
      {renderMdx(code)}
    </div>
  );
}
