import {
    Container,
    Grid
  } from "@mui/material";
import Book from "../../components/Book/Book";

function LoadBooks({state, btnLoadMore}) {
  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {state.map((item, i) => {
          let thumbnail = "";
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
    </Container>
  );
}

export default LoadBooks;
