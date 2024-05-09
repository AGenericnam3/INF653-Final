const State = require('./states'); 

const missouri = new State({
  stateCode: 'MO',
  funfacts: [
    'Missouri is home to the Gateway Arch, which is the tallest man-made monument in the U.S..',
    'Mark Twain, author of "The Adventures of Huckleberry Finn" was born in Missouri.',
    'Missouri is one of the leading producers of transportation equipment.',
  ],
});

missouri.save((err) => {
  if (err) {
    console.error('Error saving Missouri:', err);
  } else {
    console.log('Missouri saved successfully!');
  }
});