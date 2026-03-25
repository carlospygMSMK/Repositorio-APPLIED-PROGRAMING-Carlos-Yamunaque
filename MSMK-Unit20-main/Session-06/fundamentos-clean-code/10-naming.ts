/* Clean code principiles
 * 
 *    NAMING
 */ 

// Person information
type P = {
  a: number; // age
  o: 'student' | 'worker' | 'retiree';
}

// Calculate if person can retire
function p(u: P) {
  if (u.a > 65) return true;
  return false;
}

// Calculate if person can work
function w(u: P) {
  if (u.a > 16 && u.o !== 'retiree') return true;
  return false;
}

// Calculate discount
function disc(d: number, p: P) {
  if(p.o === 'student') {
    return d * 0.30;
  } else if (p.o === 'worker') {
    return d;
  } else if (p.o === 'retiree') {
    return d * 0.20;
  }
}

const person1:P = {
  a: 22,
  o: 'student'
}

console.log(`person1 can retire: ${p(person1)}`);
console.log(`person1 can work: ${w(person1)}`);


