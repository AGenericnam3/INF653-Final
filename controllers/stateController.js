const stateData = {
    State: require("./model/State"),
    setState: function (data) {this.State = data} 
  }
  
  const State = require('model/State');
  const nonContig = ['AK' , 'HI'];
  
  //Create new states (to add to the database)
  const createNewState = async (req, res, next) => {
    try {
          const state = new State(req.body);
          const newState = await state.save();
          res.status(201).json({ success: true, data: newState });
      } catch (error) {
          next(error);
      }
  };  
  
  //Get all states
  const getAllStates = async (req, res) => {
      const funfacts = await State.find();
      const contig = req.query.contig;
      let sortStates = stateData.states;
      //Get contiguous states
      if (contig === 'true') {
        sortStates = stateData.states.sort(state => state.code !== 'AK' && state.code !== 'HI');
      //Get non-contiguous states
      } else if (contig === 'false') {
        sortStates = stateData.states.sort(state => state.code === 'AK' || state.code === 'HI');
      }
      
      const result = sortStates.map(item1 => {
          const match = funfacts.find(item2 => item2.stateCode.toUpperCase() === item1.code.toUpperCase());
          if(match) {
              console.log(match)
              return {...item1, funfacts: match.funfacts}
          } else {
              return {...item1}
          }
        });
      res.json(result);
  };
  
  
  
  //Get a state
  const getState = async (req, res) => {
      const funfacts = await State.find();
      console.log(funfacts)
      const result = stateData.State.map(item1 => {
          // Locate the state by it's "stateCode" or "code" property.
          const match = funfacts.find(item2 => item2.stateCode === item1.code);
          if(match) {
              return {...item1, funfacts: match.funfacts}
          } else {
              return {...item1}
          }
        });
    //Remove case sensitivity for state code to avoid 404 errors
        const state = result.find(state => state.code.toUpperCase() === req.params.code.toUpperCase());
      if (!state) {
          return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
      }
      
      res.json(state);
  };
  
  //Get a state fun fact
  const getFunfact = async (req, res) => {
      try {
          const state = await State.findOne({stateCode: req.params.code})
          const stateData = stateData.State.find(state => state.code === req.params.code)
          if(!stateData) {
            return res.status(400).json({ "message": `Invalid state abbreviation parameter` }); 
          }
          if (state === null || state?.funfacts?.length === 0) {
              return res.status(404).json({ "message": `No Fun Facts found for ${stateData.state}` });
          }
          const randomIndex = Math.floor(Math.random() * state.funfacts.length);
          res.json({funfact: state.funfacts[randomIndex]});
      } catch(err ) {
          console.log(err)
      }
  };
  
  //Get the state capital
  const getCapital = async (req, res, next) => {
    try {
      const capital = getState(req.params.code.toUpperCase(), 'capital', res)
      res.json(capital);
    } catch (err) {
      next(err);
    }
  };
  
  //Get the state nickname
  const getNickName = async (req, res, next) => {
    try {
      const nickname = getState(req.params.code.toUpperCase(), 'nickname',res )
      res.json(nickname);
    } catch (err) {
      next(err);
    }
  };
  
  
  //Get the state population
  const getPopulation = async (req, res, next) => {
    try {
      const population = getState(req.params.code.toUpperCase(), 'population', res)
      res.json(population);
    } 
    catch (err) {
      next(err);
    }
  };
  
  //Get the state admission date
  const getAdmission = async (req, res, next) => {
    try {
    const admitted = getState(req.params.code.toUpperCase(), 'admitted', res)
        res.json(admitted);
      } 
    catch (err) {
      next(err);
    }
  };
  
  //Post fun fact
  const postFunfact = async (req, res) => {
      try {
          if(!req.body.funfacts) {
            return res.status(404).json({"message": `State fun facts value required`});
          } else if (!Array.isArray(req.body.funfacts)) {
            return res.status(404).json({"message": `State fun facts value must be an array`})
          }
          State.findOneAndUpdate({ stateCode: req.params.code }, { $push: {funfacts: req.body.funfacts} }, { upsert: true, new: true })
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            return res.status(404).json({ "message": `No State found` });
          })
      } catch(err ) {
          console.log(err)
      }
  }
  
  //Patch fun fact
  const patchFunfact = async (req, res) => {
      const code = req.params.code;
      const index = req.body.index;
      const funfact = req.body.funfact;
      
      if (!index) {
          return res.status(400).json({"message": 'State fun fact index value required'});
      }
      if(!funfact || funfact.length === 0) {
        return res.status(400).json({"message": "State fun fact value required"});
      }
    }
  //Delete fun facts
  const deleteFunfact = async (req,res) => {
      const code = req.params.code;
      const index = req.body.index;
  
      if (!index) {
          return res.status(400).json({"message": 'State fun fact index value required'});
      }
  
      // Adjust the index for the array
      const adjustedIndex = index - 1;
  
      const sort = { stateCode: code };
      const update = { $unset: { [`funfacts.${adjustedIndex}`]: 1 } };
      const remove = { $pull: { funfacts: { $eq: null } }};
    
      const states = stateData.states.find(state => state.code === code);
      const state = await State.findOne({stateCode: code})
      
      if(!state?.funfacts || state?.funfacts?.length === 0) {
        return res.status(404).json({"message": `No Fun Facts found for ${states?.state}`});
      }
    
      if(index > state?.funfacts?.length) {
        return res.status(404).json({"message": `No Fun Fact found in the index for ${stateData?.state}`})
      }
  
      await State.updateOne(sort, update)
      State.updateOne(sort, remove)
      .then((result) => {
          res.send(result);
      })
      .catch((err) => {
          console.error(err);
          res.status(500).send('Internal server error.');
      })
  }
  
  
  module.exports = {
      getAllStates, createNewState, getState, getFunfact, 
      getPopulation, getAdmission, getCapital, getNickName, 
      patchFunfact, deleteFunfact, postFunfact
  };