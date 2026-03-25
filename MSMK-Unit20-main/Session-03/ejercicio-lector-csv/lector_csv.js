import fs from 'fs';


function readCSV(path) {
  const data = fs.readFileSync(path, 'utf8');

  // Split input file in lines
  const lines = data.trim().split('\n');

  // Split each line in fields separated by comma, and convert to array
  const rows = lines.map(line => line.split(','));

  return rows;
}

// Show Data in Console
const rows = readCSV('datos.csv');
console.log(rows);
