import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axiosInstance from '@api/axios';

import { useMoralis } from 'react-moralis';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});

export default function OwnedCard({ name, description, image, balance }) {
  const classes = useStyles();
  const { Moralis } = useMoralis();

  const signAndRequest = async () => {
    const web3 = await (Moralis as any).enableWeb3();
    const [current] = await web3.eth.getAccounts();
    const message = 'Message to request restricted data';
    const signed = await web3.eth.personal.sign(message, current, '');
    axiosInstance.post('api/private', { message, signed });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          width="500"
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => signAndRequest()}>
          View restricted content
        </Button>
        <Typography variant="body2" color="textSecondary" component="p">
          {`Owned: ${balance}`}
        </Typography>
      </CardActions>
    </Card>
  );
}
