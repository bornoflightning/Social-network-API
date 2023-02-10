const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (error) => error);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thought.deleteMany({});

    const userSet = [
        {
            username: 'IlikeLemons',
            email: 'lemonsRgood@gmail.com',
        },
        {
            username: 'meatSauceAndWine',
            email: 'life@live.com',
        },
        {
            username: 'GarenMain',
            email: 'DovstoyeskyWasRight@IlluminatiConfirmed.com',
        },
        {
            username: 'RaichuMachu',
            email: 'CucucumberMakeover@thickiscool.com',
        }
    ]

    const thoughtSet = [
        {
            thoughtText: 'I was thinking a thought',
            username: 'IlikeLemons'
        },
        {
            thoughtText: 'There is apple juice, there is orange juice, how come there is no banana juice?',
            username: 'meatSauceAndWine',
        },
        {
            thoughtText: 'for DEMACIA!!',
            username: 'GarenMain',
        },
        {
            thoughtText: 'Activity times the quality equals results',
            username: 'RaichuMachu'
        },
    ]
    
    await User.collection.insertMany(userSet)
    await Thought.collection.insertMany(thoughtSet)

 
  console.info('process complete, info loaded.');
  process.exit(0);
});