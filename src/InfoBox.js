import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./style/InfoBox.css";
import numeral from "numeral";
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
        <h2 className="infoBox__total">{numeral(total).format("0,0")}</h2>
        {/* 1.2M Total */}
        <Typography className="infoBox__cases" color="textSecondary">
          Today {numeral(cases).format("0,0")}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
