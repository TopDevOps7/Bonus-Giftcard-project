import React from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Container, makeStyles } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import Button from "components/CustomButtons/Button";

import img404 from "assets/img/404.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
}));

const NotFoundView = () => {
  const classes = useStyles();
  const { partnerId } = useParams();

  let homeUrl = "/";
  if (partnerId) {
    homeUrl += partnerId;
  }

  return (
    <div className={classes.root} title="404">
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container maxWidth="md">
          {/* <Typography align="center" color="textPrimary" variant="h1">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation
          </Typography> */}
          <Box textAlign="center">
            <img alt="Under development" className={classes.image} src={img404} />
          </Box>
          <Box textAlign="center" marginTop={2}>
            <Link to={homeUrl}>
              <Button color="primary">
                <Home /> Seguir comprando
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default NotFoundView;
