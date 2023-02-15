
const App = () => {
  const courseName = "Half Stack application development";
  // new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseWithDescription extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CourseWithDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseWithDescription {
  type: "special";
  requirements: Array<string>;
}
type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart |CourseSpecialPart;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the easy course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the hard course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


  const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.type) {
      case "normal":
        return (
          <div>
            <p>{coursePart.name}  {coursePart.exerciseCount}</p>
            <i>{coursePart.description}</i>
          </div>
        )
      case "groupProject":
        return (
          <div>
            <p>{coursePart.name}  {coursePart.exerciseCount}</p>
            <p>{coursePart.groupProjectCount}</p>
          </div>
        )
      case "submission":
        return (
          <div>
            <p>{coursePart.name}  {coursePart.exerciseCount}</p>
            <i>{coursePart.description}</i>
            <p>{coursePart.exerciseSubmissionLink}</p>
          </div>
        )
      case "special":
        return (
            <div>
              <p>{coursePart.name} {coursePart.exerciseCount}</p>
              <i>{coursePart.description}</i>
              <p>Required skills: {coursePart.requirements.map(r =><div>{r}</div>)}</p>
            </div>);
      default:
        return assertNever(coursePart);
    }
  }

  const Header = ({ name }: { name: string }) => (
    <h1>{name}</h1>
  )

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((courseParts, i) => <Part key={i} coursePart={courseParts} />)}
    </div>
  )
}

  const Total = ({ courseDetails }: { courseDetails: CoursePart[] }) => (
    <p>
      Number of exercises{" "}
      {courseDetails.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )

  return (
    <div>
      <Header name={courseName } />
      <Content courseParts={courseParts}/>
      <Total courseDetails={courseParts}/>
    </div>
  );
};

export default App;