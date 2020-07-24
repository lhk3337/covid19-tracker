import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total }) {
  //{}를 입력하지 않아서 Objects are not valid as a React child (found: object with keys {}). If you meant to render a collection of children, use an array instead.
  return (
    <Card className="infoBox">
      <CardContent>
        {/* Title i.e. Coronavirus case */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        {/* +120K Number of cases */}
        <h2 className="infoBox__total">{total}</h2>
        {/* 1.2M Total */}
        <Typography className="infoBox__cases" color="textSecondary">
          {cases}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
