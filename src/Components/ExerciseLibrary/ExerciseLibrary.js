import { Link } from "react-router-dom";

const ExerciseLibrary = () => {
  const exercises = [
    {
      id: "4pzrBNLH3",
      title: "Head Nods",
    },
  ];
  return (
    <div>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <Link to={`/exercises/${exercise.id}`}>{exercise.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseLibrary;
