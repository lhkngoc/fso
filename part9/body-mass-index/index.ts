import express from 'express'
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './calculateExercises';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  const bmi = calculateBmi(height, weight)
  if (isNaN(height) && isNaN(weight) && ![height && weight]) {
    res.status(400).send({
      error: 'malformatted parameters'
  });
  }
  res.send({ weight, height, bmi });
})

app.post('/exercises', (req, res) => {
  const day = req.body.daily_exercises
  const target = req.body.target
  const ex = calculateExercises(day, target)
  if (day.length < 7 || !target) {
    res.status(400).json({
      error: 'parameters missing'
  });
  } else if (!Array(day) || isNaN(target)) {
    res.status(401).json({
      error: 'malformatted parameters'
  })
  }
  res.send({ex})
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});