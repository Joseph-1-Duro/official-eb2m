import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { useMDXComponents } from "@/../mdx-components";

type MdxContentProps = {
  source: string;
};

/** Renders MDX body content with the site-wide component mapping. */
export default function MdxContent({ source }: MdxContentProps) {
  const components = useMDXComponents({});
  return <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />;
}