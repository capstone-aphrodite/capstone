import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const ExerciseLibrary = () => {
  const classes = useStyles();
  const exercises = [
    {
      id: '4pzrBNLH3',
      title: 'Head Nods',
      image: '/images/headnod.jpeg',
      numReps: 10,
    },
  ];
  return (
    <div>
      <ul>
        {exercises.map((exercise) => (
          // <li key={exercise.id}>
          //   <Link to={`/exercises/${exercise.id}`}>{exercise.title}</Link>
          // </li>
          <Card className={classes.root} key={exercise.id}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={exercise.image}
                title={exercise.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {exercise.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Number of Reps: {exercise.numReps}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ flex: 1, justifyContent: 'center' }}>
              <Button
                size="small"
                color="primary"
                component={Link}
                to={`/exercises/${exercise.id}`}
              >
                Exercise
              </Button>
            </CardActions>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseLibrary;
