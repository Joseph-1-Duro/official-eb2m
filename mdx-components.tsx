import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }) => (
      <h2 className="article__h2" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="article__h3" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="article__p" {...props}>
        {children}
      </p>
    ),
    iframe: (props) => (
      <div className="article__video">
        <iframe {...props} />
      </div>
    ),
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith("http");
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href ?? "#"} {...props}>
          {children}
        </Link>
      );
    },
    img: (props) => {
      const { src, alt = "", width, height, ...rest } = props as Record<string, unknown> & { src: string; alt?: string };
      if (typeof width === "number" || typeof width === "string") {
        const w = Number(width);
        const h = Number(height ?? w);
        return <Image src={src as string} alt={alt} width={w} height={h} sizes="100vw" style={{ width: "100%", height: "auto" }} {...(rest as object)} />;
      }
      return <Image src={src as string} alt={alt} width={800} height={600} sizes="100vw" style={{ width: "100%", height: "auto" }} {...(rest as object)} />;
    },
    blockquote: ({ children, ...props }) => (
      <blockquote className="article__quote" {...props}>
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }) => (
      <div className="article__table-wrap">
        <table className="article__table" {...props}>
          {children}
        </table>
      </div>
    ),
    ul: ({ children, ...props }) => (
      <ul className="article__list" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="article__list" {...props}>
        {children}
      </ol>
    ),
    ...components,
  };
}
