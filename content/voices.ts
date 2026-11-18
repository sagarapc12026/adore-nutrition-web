export type Voice = {
  quote: string;
  name: string;
  role: string;
  initial: string;
};

// Beta-tester quotes, shared with permission. First names only.
export const voices: Voice[] = [
  {
    quote:
      'I cried the first time I used it. The app finally answered the question I’d been losing sleep over: is she actually okay?',
    name: 'Aanya',
    role: 'Mom of Mia, 14 months',
    initial: 'A',
  },
  {
    quote: 'Logging takes less time than spooning. I don’t know how to explain it but my anxiety actually went down.',
    name: 'Sarah',
    role: 'Mom of two, NYC',
    initial: 'S',
  },
  {
    quote:
      'Nori suggested three lunches she actually ate. After six weeks of refusal, this is the closest thing to magic I’ve found.',
    name: 'Priya',
    role: 'Mom of a picky toddler',
    initial: 'P',
  },
];
