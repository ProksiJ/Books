import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ScrollDialog from './ScrollDialog';

function Book({ img, title, category, author, item }) {
  return (
    <Card sx={{ minWidth: 200, minHeight: 340 }}>
      <CardContent >
        <CardMedia sx={{ maxWidth: 100, minWidth: 100 }}
          component="img"
          image={img}
          alt="no image"
        />
        <Typography sx={{ fontSize: 14, textDecoration: 'underline' }} color="text.secondary" gutterBottom>
          {category}
        </Typography>
        <Typography sx={{ fontSize: 20, font: 'bold' }} variant="body1">
          {title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {author}
        </Typography>
      </CardContent>
      <CardActions sx={{ ml: '25%' }}>
        <ScrollDialog
          thumbnail={img}
          title={item.volumeInfo.title}
          pageCount={item.volumeInfo.pageCount}
          language={item.volumeInfo.language}
          authors={item.volumeInfo.authors}
          publisher={item.volumeInfo.publisher}
          description={item.volumeInfo.description}
          previewLink={item.volumeInfo.previewLink}
          infoLink={item.volumeInfo.infoLink} />
      </CardActions>
    </Card>
  );
}

export default Book;