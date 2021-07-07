import { Grid } from "@material-ui/core";
import React from "react";

export const ArenaCardsGrid = (props: ArenaCardsGridProps) => {
  return (
    <Grid container spacing={6}>
      {props.cards.map((card, i) => {
        return (
          <Grid key={i} item lg={3} md={4} sm={6} xs={12}>
            {card}
          </Grid>
        );
      })}
    </Grid>
  );
};

interface ArenaCardsGridProps {
  cards: React.ReactNode[];
}
