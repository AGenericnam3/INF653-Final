const State = require('./states'); 

const colorado = new State({
  stateCode: 'CO',
  funfacts: [
    'The Spanish were the first European visitors who arrived in Colorado in the 1500s.',
    'The Royal Gorge Bridge was the highest suspension bridge in the world for more than 70 years.',
    'The name “cheeseburger” was trademarked by Louis Ballast of Humpty Dumpty Drive-In in Denver in 1935.',
  ],
});

colorado.save((err) => {
  if (err) {
    console.error('Error saving Colorado:', err);
  } else {
    console.log('Colorado saved successfully!');
  }
});