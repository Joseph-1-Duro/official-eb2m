"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export type GalleryImage = { src: string; alt: string };
export type GalleryVideo = { src: string; poster?: string; title?: string };

type GalleryProps = {
  images?: GalleryImage[];
  videos?: GalleryVideo[];
};

export default function Gallery({ images = [], videos = [] }: GalleryProps) {
  const [index, setIndex] = useState(-1);

  if (images.length === 0 && videos.length === 0) return null;

  const slides = [
    ...images.map((img) => ({ src: img.src, alt: img.alt })),
    ...videos.map((v) => ({ type: "video" as const, src: v.src, poster: v.poster, title: v.title })),
  ];

  return (
    <>
      <div className="gallery">
        {images.map((img, i) => (
          <button key={`${img.src}-${i}`} type="button" className="gallery__item" onClick={() => setIndex(i)} aria-label={`Open image ${i + 1}: ${img.alt}`}>
            <Image src={img.src} alt={img.alt} width={640} height={480} sizes="(min-width: 1024px) 33vw, 50vw" className="gallery__image" />
          </button>
        ))}
        {videos.map((v, i) => (
          <button
            key={`${v.src}-${i}`}
            type="button"
            className="gallery__item gallery__item--video"
            onClick={() => setIndex(images.length + i)}
            aria-label={`Open video ${i + 1}: ${v.title ?? v.src}`}
          >
            {v.poster ? (
              <Image src={v.poster} alt={v.title ?? "Video poster"} width={640} height={360} sizes="(min-width: 1024px) 33vw, 50vw" className="gallery__image" />
            ) : (
              <span className="gallery__video-fallback">{v.title ?? "Video"}</span>
            )}
            <span className="gallery__play" aria-hidden="true">▶</span>
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides as never}
        plugins={[Thumbnails, Zoom]}
        carousel={{ finite: true }}
        render={{
          slide: ({ slide }) => {
            const s = slide as unknown as { type?: string; src: string; poster?: string };
            if (s.type === "video") {
              return (
                <video controls poster={s.poster} style={{ maxWidth: "100%", maxHeight: "100%" }}>
                  <source src={s.src} type="video/mp4" />
                </video>
              );
            }
            return undefined;
          },
        }}
      />
    </>
  );
}
