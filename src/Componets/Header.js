import { Typography, Box} from '@mui/material';

function Header({query, setQuery, createBooks}) {
    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h1" component="div" gutterBottom>
                    Search for books
                </Typography>
            </Box>
            <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', m: 4, mb: 2, mt: 2 }}
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
        </div>
    );
}

export default Header;