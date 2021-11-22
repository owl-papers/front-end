import { useRef, ChangeEvent } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';

const styles = makeStyles({
  root: {
    paddingLeft: 12,
    width: '35%',
    maxWidth: 620,
    display: 'flex',
    marginBottom: 32
  },
  input: {
    flexGrow: 1
  }
});

export default function SearchBar({ onClick }) {
  const classes = styles();
  const value = useRef('');

  const handleType = (e: ChangeEvent<HTMLInputElement>) => {
    value.current = e.target.value;
  };

  return (
    <Paper className={classes.root}>
      <InputBase
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        className={classes.input}
        onKeyPress={(e) => e.key === 'Enter' && onClick(value.current)}
        onChange={handleType}
      />
      <IconButton
        type="button"
        aria-label="search"
        onClick={() => onClick(value.current)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
