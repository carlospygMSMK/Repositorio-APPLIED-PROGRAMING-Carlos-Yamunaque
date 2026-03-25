/* Clean code principiles
 * 
 * Exercise: Detect clean code problems
 * 
 * Smells: Naming, SRP violated, code duplicity, magic numbers, error management, complex function
*/ 

/*Naming*/
type R = { n: string; nts: number; pr: number; g?: number };
type B = { id: string; usr: string; rooms: R[]; ds?: string; tot?: number };

/*Violación del SRP*/
export function calc(b: B): any { /*Tipado any*/
  /*Gestión de Errores Pobre*/
  if (!b || !b.rooms || b.rooms.length == 0) throw "err";

  let x = 0;
  for (let i = 0; i < b.rooms.length; i++)  x += b.rooms[i].nts * b.rooms[i].pr;

  /*Magic Numbers*/
  if (b.ds) {
    /*Duplicidad de Código*/
  if (b.ds === "promo") x = x - x * 0.1;
  if (b.ds === "staff") x = x - x * 0.5;
  if (b.ds === "vip") x = x - x * 0.2;
  }

  console.log("saving...", b.id);
  console.log("email to...", b.usr);
  /*Tipado any*/
  return { ok: true, t: x };
}

/*
Naming: Los tipos R, B y las variables n, nts, pr, x no significan nada. 
Violación del SRP: La función calc calcula el total, aplica descuentos. Debería solo hacer una cosa.
Magic Numbers: Los valores 0.1, 0.5 y 0.2 están "hardcodeados". 
               Si el descuento VIP cambia, hay que buscarlo en medio de la lógica.
Gestión de Errores Pobre: Hacer throw "err" es una mala práctica. Se deben lanzar objetos de tipo Error para mantener la trazabilidad (stack trace).
Duplicidad de Código: La estructura x = x - x * 0.1 se repite innecesariamente. Se puede simplificar.
Tipado any: El uso de any en el retorno anula las ventajas de TypeScript.
*/

//-----------------------------------------------------------------------------Código Limpio
interface Room {
  name: string;
  nights: number;
  pricePerNight: number;
  guests?: number;
}

interface Booking {
  id: string; /*Porque puede ser como un DNI osea un codigo de numeros y letras*/
  userEmail: string;
  rooms: Room[]; /*Porque una reserva puede tener varias habitaciones*/
  discountType?: 'promo' | 'staff' | 'vip';
  total?: number;
}

interface CalculationResult {
  success: boolean; /*Si da error nos da un objeto con la información del error*/
  totalAmount: number;
}

// 1. Centralizamos los "Numeros Mágicos"
const DISCOUNT_RATES: Record<string, number> = {
  promo: 0.1,
  staff: 0.5,
  vip: 0.2,
};

// 2. SRP
const calculateSubtotal = (rooms: Room[]): number =>  // Solo el total sin descuentos
  rooms.reduce((acc, room) => acc + (room.nights * room.pricePerNight), 0);

const applyDiscount = (amount: number, type?: string): number => { // Aqui aplicamos el descuento, si es que hay
  if (!type || !DISCOUNT_RATES[type]) return amount;
  return amount * (1 - DISCOUNT_RATES[type]);
};

/* Calculo del total de una reserva aplicando descuentos */
export function calculateBookingTotal(booking: Booking): CalculationResult {
  if (!booking?.rooms?.length) {
    throw new Error("Invalid booking: No rooms provided."); //Más descriptivo
  }
  // Lógica clara y lineal
  const subtotal = calculateSubtotal(booking.rooms);
  const totalAmount = applyDiscount(subtotal, booking.discountType);
  // pero aquí los mantenemos limpios si son estrictamente necesarios.
  console.log(`[Booking ${booking.id}]: Total calculated: ${totalAmount}`);
  return { 
    success: true, 
    totalAmount 
  };
}