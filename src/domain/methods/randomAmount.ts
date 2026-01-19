// randomNumberUtils.ts

export type GenerationOptions = {
  total: number;
  count: number;
  useLimits: boolean;
  minValue: number;
  maxValue: number;
  numberType: 'any' | 'multiple';
  multipleOf: number;
};

export type NumberResult = {
  numbers: number[];
  sum: number;
  timestamp: Date;
  options: GenerationOptions;
};

export type ValidationError = {
  isValid: boolean;
  message: string;
};

/**
 * Obtiene un número aleatorio en un rango
 */
export const getRandomNumberInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Redondea un número al múltiplo más cercano
 */
export const roundToMultiple = (num: number, multiple: number): number => {
  return Math.round(num / multiple) * multiple;
};

/**
 * Ajusta los números para que sumen exactamente el total objetivo
 */
export const adjustNumbersToSum = (
  numbers: number[],
  difference: number,
  options: GenerationOptions
): void => {
  let remainingDifference = difference;
  const maxIterations = 1000;
  let iterations = 0;

  while (Math.abs(remainingDifference) > 0.01 && iterations < maxIterations) {
    const index = Math.floor(Math.random() * numbers.length);
    const adjustment = remainingDifference / 10;

    let newValue = numbers[index] + adjustment;

    if (options.useLimits) {
      newValue = Math.max(options.minValue, Math.min(options.maxValue, newValue));
    }

    if (options.numberType === 'multiple') {
      newValue = roundToMultiple(newValue, options.multipleOf);
    }

    newValue = Math.max(0, newValue);

    const actualAdjustment = newValue - numbers[index];
    numbers[index] = newValue;
    remainingDifference -= actualAdjustment;

    iterations++;
  }

  if (Math.abs(remainingDifference) > 0.01) {
    const perNumberAdjustment = remainingDifference / numbers.length;

    for (let i = 0; i < numbers.length; i++) {
      numbers[i] += perNumberAdjustment;

      if (options.useLimits) {
        numbers[i] = Math.max(options.minValue, Math.min(options.maxValue, numbers[i]));
      }

      if (options.numberType === 'multiple') {
        numbers[i] = roundToMultiple(numbers[i], options.multipleOf);
      }
    }
  }
};

/**
 * Valida las opciones de generación
 */
export const validateInputs = (options: GenerationOptions): ValidationError => {
  if (options.total <= 0) {
    return { isValid: false, message: 'El total debe ser mayor que 0.' };
  }

  if (options.count <= 0) {
    return { isValid: false, message: 'La cantidad de números debe ser mayor que 0.' };
  }

  if (options.count > options.total) {
    return { isValid: false, message: 'La cantidad de números no puede ser mayor que el total.' };
  }

  if (options.useLimits) {
    if (options.minValue < 0) {
      return { isValid: false, message: 'El valor mínimo no puede ser negativo.' };
    }

    if (options.maxValue <= options.minValue) {
      return { isValid: false, message: 'El valor máximo debe ser mayor que el mínimo.' };
    }

    if (options.minValue * options.count > options.total) {
      return {
        isValid: false,
        message: `Con un mínimo de ${options.minValue} y ${options.count} números, la suma mínima posible es ${options.minValue * options.count}, que es mayor que el total ${options.total}.`
      };
    }

    if (options.maxValue * options.count < options.total) {
      return {
        isValid: false,
        message: `Con un máximo de ${options.maxValue} y ${options.count} números, la suma máxima posible es ${options.maxValue * options.count}, que es menor que el total ${options.total}.`
      };
    }
  }

  if (options.numberType === 'multiple' && options.multipleOf <= 0) {
    return { isValid: false, message: 'El múltiplo debe ser mayor que 0.' };
  }

  return { isValid: true, message: '' };
};

/**
 * Genera números aleatorios que suman el total especificado
 */
export const generateRandomNumbers = (options: GenerationOptions): number[] => {
  const numbers: number[] = [];

  for (let i = 0; i < options.count; i++) {
    let randomNum = 0;

    if (options.useLimits) {
      randomNum = getRandomNumberInRange(options.minValue, options.maxValue);
    } else {
      randomNum = getRandomNumberInRange(0, options.total);
    }

    if (options.numberType === 'multiple') {
      randomNum = roundToMultiple(randomNum, options.multipleOf);
    }

    numbers.push(randomNum);
  }

  const sum = numbers.reduce((a, b) => a + b, 0);
  const difference = options.total - sum;

  if (difference !== 0) {
    adjustNumbersToSum(numbers, difference, options);
  }

  return numbers.map(num => Math.round(num * 100) / 100);
};

/**
 * Crea un resultado completo con números generados
 */
export const createNumberResult = (options: GenerationOptions): NumberResult => {
  const numbers = generateRandomNumbers(options);
  return {
    numbers,
    sum: numbers.reduce((a, b) => a + b, 0),
    timestamp: new Date(),
    options
  };
};

/**
 * Guarda el historial en localStorage
 */
export const saveHistoryToStorage = (history: NumberResult[]): void => {
  try {
    const historyData = JSON.stringify(
      history.map(item => ({
        ...item,
        timestamp: item.timestamp.toISOString()
      }))
    );
    localStorage.setItem('randomNumberHistory', historyData);
  } catch (e) {
    console.error('Error al guardar el historial:', e);
  }
};

/**
 * Carga el historial desde localStorage
 */
export const loadHistoryFromStorage = (): NumberResult[] => {
  try {
    const historyData = localStorage.getItem('randomNumberHistory');
    if (historyData) {
      const parsedHistory = JSON.parse(historyData);
      return parsedHistory.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
    }
  } catch (e) {
    console.error('Error al cargar el historial:', e);
  }
  return [];
};

/**
 * Agrega un resultado al historial (máximo 10 elementos)
 */
export const addToHistory = (
  history: NumberResult[],
  newResult: NumberResult
): NumberResult[] => {
  return [newResult, ...history].slice(0, 10);
};