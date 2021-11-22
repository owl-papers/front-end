import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from './styles';

const styles = makeStyles({
  image: {
    height: 140
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'box',
    lineClamp: 2,
    boxOrient: 'vertical'
  },
  description: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'box',
    lineClamp: 4,
    boxOrient: 'vertical'
  }
});

const FALL_BACK_MEDIA = 'https://source.unsplash.com/random?sig=213';

export default function ImgMediaCard({ name, description, image }) {
  const classes = styles();

  return (
    <Card>
      <CardMedia
        component="img"
        image={image}
        alt="Image"
        className={classes.image}
        onError={(e) => {
          e.target.src = FALL_BACK_MEDIA;
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className={classes.title}
        >
          {name}
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.description}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          Read More
        </Button>
        <Button size="small" color="primary">
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}
