interface MultiplyValues {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
}

export const calculateBmi = (height: number, weight: number): string => {
    if (weight <= 0 || height <= 0) {
        throw new Error(`Provided values must be greater than 0!`);
      }

      const bmi = weight / height ** 2;

      let messgae;
      if (bmi < 25) {
        messgae = "Normal (healthy weight)";
      } else if (25 <= bmi && bmi <= 29) {
        messgae = "Overweight (not healthy weight)";
      } else {
        messgae = "Obese (not healthy weight)";
      }

      return messgae;
    };

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight))
}catch(error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}