import React, {useEffect} from 'react';

import { Box , Typography } from '@material-ui/core';

import useStyles from '../assets/styles';

export default ({getSingleMovie, movieId, movie}) => {
  const classes = useStyles();

  useEffect(() => {
    getSingleMovie(movieId);
  }, [])

  return (  
  <Box display="flex">
    <Box mr={3}>
      <Typography variant="h2">
        {movie.title}
      </Typography>
      <Typography variant="h5">
        Release Date: {movie.release_date}
      </Typography>
      <Typography variant="h5">
        Genres: {movie.genres && movie.genres.map(genre => genre.name + ' | ' )}
      </Typography>
      <Typography variant="h6">
        Overview: {movie.overview}
      </Typography>
    </Box>
    <img className={classes.poster} src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
  </Box>
  )
}

/* export default class SingleMovie extends React.Component{
  
  componentDidMount() {
    this.props.getSingleMovie(this.props.movieId);
  }
  
  
  
  render (){
    const classes = useStyles();
    const { movie} = this.props;
    console.log(`movie`, movie);
    return (
    <>
      <Typography variant="h2">
        {movie.title}
      </Typography>
    </>

    )
  }
} */


/* movie.genre && movie.genres.map((genre, index) => {
  //let plus = index===movie.genres.length -1? ' | ': '';
  return genre.name })} */