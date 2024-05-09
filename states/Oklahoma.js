const State = require('./states'); 

const oklahoma = new State({
  stateCode: 'OK',
  funfacts: [
    'The name "Oklahoma" is derived from the choctaw words “okla” and “humma”, meaning “red people”.',
    'Oklahoma was added to the United States as a part of the Louisiana Purchase of 1803.',
    'Oklahoma City is the second-largest capital city in the United States by area.',
  ],
});

oklahoma.save((err) => {
  if (err) {
    console.error('Error saving Oklahoma:', err);
  } else {
    console.log('Oklahoma saved successfully!');
  }
});