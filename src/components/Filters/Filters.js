import { Box,  FormControl, InputLabel, Select, MenuItem } from "@mui/material";


function Filters({category, handleChangeCategory, sort, handleChangeSort}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        color: "white",
      }}
    >
      <FormControl sx={{ width: 150, m: 2 }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Categories"
          onChange={handleChangeCategory}
        >
          <MenuItem value="all">all</MenuItem>
          <MenuItem value="art">art</MenuItem>
          <MenuItem value="biography">biography</MenuItem>
          <MenuItem value="computers">computers</MenuItem>
          <MenuItem value="history">history</MenuItem>
          <MenuItem value="medical">medical</MenuItem>
          <MenuItem value="poetry">poetry</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ width: 150, m: 2 }}>
        <InputLabel id="demo-simple-select-label-sort">Sorting</InputLabel>
        <Select
          labelId="demo-simple-select-label-sort"
          id="demo-simple-select-sort"
          value={sort}
          label="Sorting"
          onChange={handleChangeSort}
        >
          <MenuItem value="relevance">relevance </MenuItem>
          <MenuItem value="newest">newest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Filters;
