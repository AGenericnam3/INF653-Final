const State = require('./states'); 

const kansas = new State({
  stateCode: 'KS',
  funfacts: [
    'Kansas produces 334 million bushels of wheat, which is about 18% of all wheat grown in the U.S., each year.',
    'Dorothy from "The Wizard of Oz" is famously associated with Kansas.',
    'Kansas has more miles of highway per square mile than any other state.',
  ],
});

kansas.save((err) => {
  if (err) {
    console.error('Error saving Kansas:', err);
  } else {
    console.log('Kansas saved successfully!');
  }
});