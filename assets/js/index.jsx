const React = require('react');
const ReactDOM = require('react-dom');
const Events = require('./Events.jsx');

// ReactDOM.render(<Events min={2002} max={2013} data={[
//   ['2002', '09/2002', 'A freaking awesome time', 'lorem'],
//   ['06/2002', '09/2003', 'Some great memories', 'ipsum'],
//   ['2003', 'Had very bad luck'],
//   ['10/2003', '2006', 'At least had fun', 'dolor'],
//   ['02/2005', '05/2006', 'Enjoyed those times as well', 'ipsum'],
//   ['07/2005', '09/2005', 'Bad luck again', 'default'],
//   ['10/2005', '2008', 'For a long time nothing happened', 'dolor'],
//   ['01/2008', '05/2009', 'LOST Season #4', 'lorem'],
//   ['01/2009', '05/2009', 'LOST Season #4', 'lorem'],
//   ['02/2010', '05/2010', 'LOST Season #5', 'lorem'],
//   ['09/2008', '06/2010', 'FRINGE #1 & #2', 'ipsum']
// ]}/>, document.getElementById('react-app'));

ReactDOM.render(<Events data={[
  {
    summary: 'FFTH',
    begin: '20160904T180000Z',
    end: '20160904T233000Z',
    description: 'bières.',
  },
  {
    summary: 'JANE',
    begin: '20160916T070000Z',
    end: '20160916T150000Z',
    description: 'Journée d\'accueil des nouveaux étudiants.',
  }, 
  {
    summary: 'Soirée Mousse',
    begin: '20161012T200000Z',
    end: '20161013T010000Z',
    description: 'Journée d\'accueil des nouveaux étudiants.',
  }, 
]}/>, document.getElementById('react-app'));
