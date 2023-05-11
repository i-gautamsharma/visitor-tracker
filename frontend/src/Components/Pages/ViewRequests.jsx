import React from "react";
import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { TokenContext } from "../../App";

import { Grid } from "@mui/material";
const UserRequests = (props) => {
  const { jwtToken } = useContext(TokenContext);
  if (!jwtToken) return <Redirect to="/home" />;
  const [Requests, setRequests] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/request", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("CallMade");
          console.log(data);
          const dataArray = Object.values(data);
          setRequests(dataArray);
          console.log(dataArray);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);

  const req = Requests.map((req) => {
    const visitingDate = new Date(req.visitingDate).toLocaleString();
    return (
      <>
        <Grid item xs={12} sm={2} md={3} key={req.id}>
          <Card>
            <CardActionArea >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" id={req.name}>
                  {req.name}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  {req.reason}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {visitingDate}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {req.reqStatus==="Rejected" && (
                <Button size="small" color="error" variant="contained">
                  Request Rejected
                </Button>
              )}
              {req.reqStatus==="Accepted" && (
                <Button size="small" color="success" variant="contained">
                  Request Accepted
                </Button>
              )}
              {req.reqStatus==="Pending" && (
                <Button size="small" color="warning" variant="contained">
                  Request Pending
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      </>
    );
  });
  return (
    <>
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        mt={2}
        spacing={3}
      >
        {req}
      </Grid>
    </>
  );
};
export default UserRequests;
