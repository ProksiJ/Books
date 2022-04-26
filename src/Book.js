import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ScrollDialog from './ScrollDialog';

function Book({ img, title, category, author, item }) {
  return (
    <Card sx={{ width: 250, height: 400 }}>
      <CardContent >
      <Box sx={{ width: 200, height: 300, m:1}}>
        <CardMedia sx={{ width: 100, height: 150}}
          component="img"
          image={img}
          alt="no image"
        />
        
          <Typography sx={{ fontSize: 14, textDecoration: 'underline', m:1 }} color="text.secondary" >
            {category}
          </Typography>
          <Typography sx={{ fontSize: 18, font: 'bold'  }} variant="body1">
            {title}
          </Typography>
          <Typography sx={{ fontSize: 14  }} color="text.secondary">
            {author}
          </Typography>
        </Box>
        
      </CardContent>
      <CardActions gutterBottom sx={{ ml: '18%'}}>
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