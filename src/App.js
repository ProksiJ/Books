import './App.css';
import { Typography, Box, Container, Button, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Book from './Book';

function App() {

  const [query, setQuery] = useState('')
  const [state, setState] = useState([])
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');
  const [startIndex, setStartIndex] = useState(0);
  const [totalItem, setTotalItem] = useState()

  const handleChangeCategory = (event) => {
    setCategory(event.target.value)
    setState([])
    setTotalItem()
  };
  const handleChangeSort = (event) => {
    setSort(event.target.value);
    setState([])
    setTotalItem()
  };

  const findBooks = () => {
    setLoading(true);
    let queryCategory
    category == 'all' ? queryCategory = '' : queryCategory = category
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}+subject:${queryCategory}&orderBy=${sort}&maxResults=30&startIndex=${startIndex}&key=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        setTotalItem(response.data.totalItems)
        setState(state.concat(response.data.items))
        setLoading(false)
      })
  }

  const createBooks = (e) => {
    e.preventDefault();
    findBooks()
  }

  const load = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>)
    }
  }
  const btnLoadMore = () => {
    if (state.length !== totalItem)
      return (
        <Button size="medium" onClick={loadMore}>load more</Button>
      )
  }
  const handleCards = () => {
    return (
      <Container maxWidth='md'>
        <Grid container spacing={4}>
          {state.map((item, i) => {
            let thumbnail = '';
            if (item.volumeInfo.imageLinks) {
              thumbnail = item.volumeInfo.imageLinks.thumbnail;
            }
            return (
              <Grid item key={i} xs={12} md={4} sm={6}>
                <Book
                  item={item}
                  title={item.volumeInfo.title}
                  img={thumbnail}
                  category={item.volumeInfo.categories}
                  author={item.volumeInfo.authors}
                />
              </Grid>
            );
          })}
        </Grid>
        {btnLoadMore()}
      </Container>)
  }

  const loadMore = () => {
    setStartIndex(startIndex + 30)
    findBooks()
  }

  const result = () => {
    if (totalItem !== 0 && state.length <= totalItem)
      return (
        <div>
          <Typography variant="h5" component="div" >
            Found {totalItem} results
          </Typography>
          {handleCards()}
        </div>
      )
    else if (totalItem == 0) return (
      <Typography variant="h5" component="div" >
        no result
      </Typography>
    )
  }

  return (
    <div className="App">
      <div className="Search">
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h1" component="div" gutterBottom>
            Search for books
          </Typography>
        </Box>
        <Container maxWidth='md'>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', m: 2 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for books"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={createBooks}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Container>

        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', color: 'white' }}>
          <FormControl sx={{ width: 150, m: 2 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Categories"
              onChange={handleChangeCategory}
            >
              <MenuItem value='all'>all</MenuItem>
              <MenuItem value='art'>art</MenuItem>
              <MenuItem value='biography'>biography</MenuItem>
              <MenuItem value='computers'>computers</MenuItem>
              <MenuItem value='history'>history</MenuItem>
              <MenuItem value='medical'>medical</MenuItem>
              <MenuItem value='poetry'>poetry</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: 150, m: 2 }}>
            <InputLabel id="demo-simple-select-label-sort" >Sorting</InputLabel>
            <Select
              labelId="demo-simple-select-label-sort"
              id="demo-simple-select-sort"
              value={sort}
              label="Sorting"
              onChange={handleChangeSort}
            >
              <MenuItem value='relevance'>relevance </MenuItem>
              <MenuItem value='newest'>newest</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="Books" align='center'>
        {result()}
        {load()}
      </div>
    </div>
  );
}

export default App;
