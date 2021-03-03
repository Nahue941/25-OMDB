import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from '../assets/styles';


/* const useStyles = makeStyles((theme) => ({
  container:{
    display: "flex",
    paddingRight: "1em"
  },
  item:{
    marginLeft: "1em",
    marginBottom: "2em"
  },
})); */

export default function SpacingGrid({movies}) {
  const classes = useStyles();


  return (
    <>
      {/* <Typography className={classes.text} variant="h4">
        Top 20 favorites
      </Typography> */}
      <Grid justify="center" className={classes.container} container spacing={0}>
        {movies.length > 0 && movies.map((movie) => (
          <Grid className={classes.item} key={movie.id} item xs={"auto"}>
            <img alt={movie.title} className={classes.img} src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
}


//key api_key=d98d5172db31443351abd3b76c67cde3