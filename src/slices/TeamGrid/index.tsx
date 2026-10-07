import React, { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { Heading } from "@/src/components/Heading";
import { Bounded } from "@/src/components/Bounded";
import { createClient } from "@/prismicio";
import { Skater } from "@/src/components/Skater";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid: FC<TeamGridProps> = async ({ slice }) => {
  const client = createClient();
  const skaters = await client.getAllByType("skater");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy"
    >
      <Heading as="h2" size="lg" className="text-center text-white mb-8">
        <PrismicText field={slice.primary.heading} />
      </Heading>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {skaters.map((skater, index) => (
          <React.Fragment key={index}>
            <Skater Skater={skater} index={index} />
          </React.Fragment>
        ))}
      </div>
    </Bounded>
  );
};

export default TeamGrid;
