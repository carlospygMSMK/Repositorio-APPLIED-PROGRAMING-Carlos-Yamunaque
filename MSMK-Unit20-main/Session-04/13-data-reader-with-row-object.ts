
/**
 * Example implementing the DataReader using a class Row to represent row's data.
 * 
 * Instead of storing row data in array, uses a specific class.
 * 
 * Exercise 1: Use geters and setters to access object properties
 * 
 * Exercise 2: Set initial properties on constructor
 */

import fs from 'node:fs';

// Row Object
class Row {
  rowNumber?: number;
  columnsCount?: number;
  columnsData?: string[];
}


// Function to Read a file and returns an array of rows
function readCSV(path: string): { header: Row, rows: Row[]} {
  const data = fs.readFileSync(path, 'utf8');

  // Split input file in lines
  const lines = data.trim().split('\n');

  // headerLine is the first line
  const headerLine = <string>lines[0];

  // Shift lines to start in the second line (all the others but the first line)
  lines.shift();


  // Split header in fields separated by comma, and convert to array
  const header = new Row();
  header.rowNumber = 0;
  header.columnsData = headerLine.split(',')
  header.columnsCount = header.columnsData.length;

  const rows = lines.map((line, index) => {
    const row = new Row();
    row.rowNumber = index + 1;
    row.columnsData = line.split(',');
    row.columnsCount = row.columnsData?.length;
    return row;
  });

  return { header, rows };
}


// Parse parameters
const args = process.argv.slice(2)
const [command, file] = process.argv;
if(args.length != 2 || args[0] !== '--input-file') {
  console.error(`Usage: ${command} ${file} --input-file filename`)
  process.exit(1);
}
const dataFile= args[1] as string;

// Read the data file
const { header, rows } = readCSV(dataFile);

// Show header in console
console.log(`The header row has ${header.columnsCount} fields.`);
console.log('Header: ', header.columnsData);

// Show rows in console
console.log('Rows: ');
rows.forEach(row => console.log(`Row ${row.rowNumber} with ${row.columnsCount} fields => `, row.columnsData));

