import React, { useState, useEffect } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import clsx from 'clsx';

import axios from 'axios';

import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './containers/navbar';
import Grid from './components/grid';
import Sidebar from './components/sidebar';
import Login from './components/logingForm';
import Register from './components/registerForm';
import SingleMovie from './components/singleMovie';
import useStyles from './assets/styles';

const key = `d98d5172db31443351abd3b76c67cde3`;
const server = `http://localhost:8000`;

export default function App() {

  const history = useHistory();

  const [popMovies, setPopMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [categories, setCategories] = useState([]);
  const [userLoged, setUserLoged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const theme = useTheme();

  useEffect(() => {
    axios(`${server}/api/me`, { 
        method: 'get',
        withCredentials: true 
    })
      .then(({data}) => {
        console.log(data)
        if (data) {
          setCurrentUser(data);
          setUserLoged(true);
        }
      });
  }, [])

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`)
      .then(res => setPopMovies(res.data.results))
  }, []);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`)
      .then(res => setCategories(res.data.genres));
  }, []);

  const getSingleMovie = movieId => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`)
      .then(res => setMovie(res.data));
  }

  const handleInputChange = (e) => {
    if (e.key === 'Enter') {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${input}&page=1&include_adult=false`)
        .then(res => setPopMovies(res.data.results));
    } else setInput(e.target.value);
  };

  const selectGenre = (genreId) => {
    axios.get(`http://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genreId}&$page=1`)
      .then(res => setMovies(res.data.results));
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const submitSingIn = (e, user) => {
    e.preventDefault();
    axios({
      method: 'post',
      data: user,
      withCredentials: true,
      url: `${server}/api/login`
    })
    .then(({ data }) => {
      setCurrentUser(data);
      setUserLoged(true);
      history.push(`/`);
    });
  }

  const submitSingUp = (e, newUser) => {
    e.preventDefault();
    axios.post(`${server}/api/register`, newUser)
      .then(({ data }) => {
        setCurrentUser(data);
        setUserLoged(true);
        history.push(`/`);
      })
  }

  const logOut = () => {
    axios.post(`${server}/api/logout`, currentUser)
      .then(user => {
        console.log(`usuario deslogueado`);
        setCurrentUser({});
        setUserLoged(false);

      });
  }


  const classes = useStyles();


  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        userLoged={userLoged}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleInputChange={handleInputChange}
        logOut={logOut}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Sidebar
          handleDrawerClose={handleDrawerClose}
          categories={categories}
          selectGenre={selectGenre}
        />
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route path="/movies/:id" render={({ match }) =>
            <SingleMovie
              getSingleMovie={getSingleMovie}
              movieId={match.params.id}
              movie={movie}
            />
          } />
          <Route path="/login" render={() => <Login
            submitSingIn={submitSingIn}
          />} />
          <Route path="/register" render={() => <Register
            submitSingUp={submitSingUp} />} />

          <Route path="/genre/" render={() => <Grid movies={movies} />} />

          <Route exact path="/" render={() => <Grid movies={popMovies} />} />
        </Switch>
      </main>



    </div>
  );
}

//Para busquedas de una sola peli
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US