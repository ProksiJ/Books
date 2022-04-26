import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ScrollDialog({ thumbnail,
  title,
  pageCount,
  language,
  description,
  authors,
  publisher,
}) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>More Information</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title"> {title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <div className='modal-body'>
            <div className='d-flex justify-content-between ml-3'>
              <img src={thumbnail} alt={title} style={{ height: '233px' }} />
              <div>
                <p>Page Count: {pageCount}</p>
                <p>Language : {language}</p>
                <p>Authors : {authors}</p>
                <p>Publisher : {publisher}</p>
              </div>
            </div>
            <div className='mt-3'>{description}</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}