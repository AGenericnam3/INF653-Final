const State = require('./states'); 

const nebraska = new State({
  stateCode: 'NE',
  funfacts: [
    'The name Nebraska comes from an Oto (also spelled Otoe) Indian word meaning “flat water.',
    'Tip Top, an Omaha, Nebraska local company, invented and produced Pink hair curlers. For more than 40 years they were manufactured here.',
    'The founder of Scientology, L. Ron Hubbard, is originally from Nebraska. The writer and director of BattleField Earth was born in Tilden, Nebraska, on March 13, 1911.',
  ],
});

nebraska.save((err) => {
  if (err) {
    console.error('Error saving Nebraska:', err);
  } else {
    console.log('Nebraska saved successfully!');
  }
});