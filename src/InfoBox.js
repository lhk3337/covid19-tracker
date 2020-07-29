import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./style/InfoBox.css";
function InfoBox({
  title,
  cases,
  isGreen,
  isOrange,
  isRed,
  active,
  total,
  ...props
}) {
  //{}를 입력하지 않아서 Objects are not valid as a React child (found: object with keys {}). If you meant to render a collection of children, use an array instead.
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      } ${isOrange && "infoBox--orange"}`}
    >
      <CardContent>
        {/* Title i.e. Coronavirus case */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        {/* +120K Number of cases */}
        <h2
          className={`infoBox__total ${isGreen && "infoBox__cases--green"} ${
            isRed && "infoBox__cases--red"
          } ${isOrange && "infoBox__cases--orange"}`}
        >
          {total}
        </h2>
        {/* 1.2M Total */}
        <Typography className="infoBox__cases" color="textSecondary">
          Today {cases}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
