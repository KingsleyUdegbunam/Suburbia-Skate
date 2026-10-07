import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/src/components/Bounded";
import { LazyYouTubePlayer } from "@/src/components/LazyYouTubePlayer";
import clsx from "clsx";
import Image from "next/image";

const MASK_CLASSES =
  "[mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no_repeat] [mask-size:100%_auto]";

/**
 * Props for `VideoBlock`.
 */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

/**
 * Component for "VideoBlock" Slices.
 */
const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-zinc-900"
    >
      <h2 className="sr-only">Video Reel</h2>
      <div className="relative aspect-video">
        {/* Mask */}
        <div
          className={clsx(
            "absolute inset-0 bg-brand-lime translate-x-2 md:translate-x-3 translate-y-2 md:translate-y-3",
            MASK_CLASSES,
          )}
        ></div>
        <div
          className={clsx(
            "absolute inset-0 bg-white translate-x-1  md:translate-x-3 translate-y-1 md:translate-y-2",
            MASK_CLASSES,
          )}
        ></div>
        <div
          className={clsx(
            "absolute inset-0 bg-white translate-x-1 md:translate-x-2 -translate-y-1 md:-translate-y-3",
            MASK_CLASSES,
          )}
        ></div>

        {/* Video */}
        <div className={clsx(MASK_CLASSES, "relative, h-full")}>
          {isFilled.keyText(slice.primary.you_tube_video_id) ? (
            <LazyYouTubePlayer youTubeID={slice.primary.you_tube_video_id} />
          ) : null}
        </div>
        {/* Texture overlay */}
        <Image
          className={clsx(
            "object-cover pointer-events-none opacity-50",
            MASK_CLASSES,
          )}
          src="/image-texture.png"
          alt=""
          fill
        />
      </div>
    </Bounded>
  );
};

export default VideoBlock;
