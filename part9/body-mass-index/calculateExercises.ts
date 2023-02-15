interface ExerciseCalculator {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Input {
    day: number[];
    target: number;
}

const parseArgument = (args: Array<string>): Input => {
    if(args.length < 10) throw new Error('Not enough arguments');



        if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])) && !isNaN(Number(args[4])) && !isNaN(Number(args[5])) && !isNaN(Number(args[6])) && !isNaN(Number(args[7])) && !isNaN(Number(args[8])) && !isNaN(Number(args[9]))) {
        return {
            day: [Number(args[2]), Number(args[3]), Number(args[4]), Number(args[5]), Number(args[6]), Number(args[7]), Number(args[8])],
            target: Number(args[9])
        };
      } else {
        throw new Error('Provided values were not numbers!');
      }
};


export const calculateExercises = (day: number[], target: number) : ExerciseCalculator => {
    let trainingDays = 0;
    let total = 0;
    let average = 0;
    let rating = 0;
    let ratingDescription = "";
    let success = false;

    for( let i = 0; i < day.length; i++) {
        if(day[i] > 0) {
            trainingDays++;
        }
        total += day[i];
    }
    average = total / 7;
    if(average >= target) {
        success = true;
    }

    if(average < 1) {
        rating = 1;
        ratingDescription = "Don't be lazy! Don't give up!";
    } else if(average < 1.5 && average >= 1) {
        rating = 2;
        ratingDescription = "You can do better!";
    } else if(average < 2 && average >= 1.5) {
        rating = 3;
        ratingDescription = "Not too bad but could be better";
    } else {
        rating = 4;
        ratingDescription = "You are doing great! Keep it up!";
    }

    return {
        periodLength: day.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const { day, target } = parseArgument(process.argv);
    console.log(calculateExercises(day, target));
} catch(e) {
    console.log(e);
}
