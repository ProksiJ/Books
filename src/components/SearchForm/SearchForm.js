import { Container, Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function SearchForm({createBooks, setQuery, query}) {
    return ( 
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
     );
}

export default SearchForm;