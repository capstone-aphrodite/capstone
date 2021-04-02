import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';
import { exercises } from './ExerciseList';

const ExerciseLibrary = () => {
  const classes = useStyles();
  return (
    <div>
      <ul>
        {exercises.map(exercise => (
          <Card className={classes.root} key={exercise.id}>
            <CardActionArea className={classes.card}>
              <CardContent className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={exercise.image}
                  title={exercise.title}
                />
                <div className={classes.label}>
                  <Typography gutterBottom variant="h6">
                    {exercise.title}
                  </Typography>
                  <Typography variant="body2" color="inherit" component="p">
                    Number of Reps: {exercise.numReps}
                  </Typography>
                </div>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ flex: 1, justifyContent: 'center' }}>
              <Link
                // size="small"
                // color="primary"
                // variant="outlined"
                // component={Link}
                className={classes.link}
                to={{
                  pathname: `/exercises/${exercise.id}`,
                  reps: `${exercise.numReps}`,
                  demo: `${exercise.demo}`,
                }}
              >
                START <ForwardOutlinedIcon />
              </Link>
            </CardActions>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseLibrary;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    minWidth: '250px',
    maxWidth: '100%',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  media: {
    display: 'flex',
    flexFlow: 'row nowrap',
    jusitfyContent: 'center',
    alignItems: 'center',
    height: 110,
    width: 110,
  },
  label: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    display: 'flex',
    backgroundColor: '#073B4C',
    color: 'white',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
    textDecoration: 'none',
    color: '#118AB2',
    fontWeight: 600,
  },
});
