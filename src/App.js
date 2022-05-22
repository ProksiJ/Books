import "./App.css";
import {
  Typography,
  Box,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Book from "./components/Book/Book";
import Header from "./components/Header/Header";
import SearchForm from "./components/SearchForm/SearchForm";
import Filters from "./components/Filters/Filters";
import LoadBooks from "./containers/LoadBooks/LoadBooks";

function App() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [startIndex, setStartIndex] = useState(0);
  const [totalItem, setTotalItem] = useState();

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    setState([]);
    setTotalItem();
  };
  const handleChangeSort = (event) => {
    setSort(event.target.value);
    setState([]);
    setTotalItem();
  };

  const findBooks = () => {
    setLoading(true);
    let queryCategory;
    category == "all" ? (queryCategory = "") : (queryCategory = category);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}+subject:${queryCategory}&orderBy=${sort}&maxResults=30&startIndex=${startIndex}&key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setTotalItem(response.data.totalItems);
        setState(state.concat(response.data.items));
        setLoading(false);
      });
  };

  const createBooks = (e) => {
    e.preventDefault();
    findBooks();
  };

  const load = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    }
  };
  const btnLoadMore = () => {
    if (state.length !== totalItem)
      return (
        <Button size="medium" onClick={loadMore}>
          load more
        </Button>
      );
  };
  const handleCards = (state) => {
    return(<LoadBooks state={state}></LoadBooks>)
    
  };

  const loadMore = () => {
    setStartIndex(startIndex + 30);
    findBooks();
  };

  const result = () => {
    if (totalItem !== 0 && state.length <= totalItem)
      return (
        <div>
          <Typography variant="h5" component="div">
            Found {totalItem} results
          </Typography>
          {handleCards()}
        </div>
      );
    else if (totalItem == 0)
      return (
        <Typography variant="h5" component="div">
          no result
        </Typography>
      );
  };

  return (
    <div className="App">
      <div className="Search">
        <Header />
        <SearchForm
          setQuery={setQuery}
          createBooks={createBooks}
          query={query}
        />
        <Filters 
          category={category}
          sort={sort}
          handleChangeCategory={handleChangeCategory}
          handleChangeSort={handleChangeSort}/>
      </div>
      <div className="Books" align="center">
        {result()}
        {load()}
      </div>
    </div>
  );
}

export default App;
