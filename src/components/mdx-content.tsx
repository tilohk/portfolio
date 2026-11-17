import * as runtime from "react/jsx-runtime";

type MdxModule = { default: (props: object) => React.ReactNode };

// Velite compiles MDX at build time to a function body. Evaluating it yields the MDX
// function, which uses no hooks, so it is called directly instead of mounted as a component.
function renderMdx(code: string) {
  const mdx = new Function(code)({ ...runtime }) as MdxModule;
  return mdx.default({});
}

export function MdxContent({ code }: { code: string }) {
  return (
    <div className="max-w-prose space-y-4 text-lg leading-relaxed [&_a]:underline [&_h2]:mt-10 [&_h2]:text-sm [&_h2]:tracking-[0.25em] [&_h2]:text-teal [&_h2]:uppercase [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-semibold">
      {renderMdx(code)}
    </div>
  );
}
