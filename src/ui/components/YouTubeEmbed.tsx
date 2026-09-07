type YouTubeEmbedProps = {
  id: string;
  title?: string;
};

/** Responsive 16/9 YouTube embed wrapped in `.article__video`. Used via the
 * `YouTube` MDX component mapping — raw `<iframe>` HTML in MDX bodies bypasses
 * the mdx-components map, so posts must opt into the wrapper explicitly. */
export default function YouTubeEmbed({ id, title = "YouTube video" }: YouTubeEmbedProps) {
  return (
    <div className="article__video">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}