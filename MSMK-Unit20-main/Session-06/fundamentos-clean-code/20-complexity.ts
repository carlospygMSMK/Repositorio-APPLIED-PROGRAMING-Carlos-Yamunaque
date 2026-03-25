/* Clean code principiles
 * 
 *    COMPLEXITY  -> SRP
 */ 

type Order = { id: string; userId: string; items: { name: string; price: number; qty: number }[]; type?: string; total?: number };


export async function process(o: Order, apply_disc?: boolean): Promise<any> {
  // validar
  if (!o || !o.items || o.items.length === 0) throw new Error("bad order");
  let t = 0;
  for (let i = 0; i < o.items.length; i++) {
    t += o.items[i]!.price * o.items[i]!.qty;
  }
  if (apply_disc) {
    if (o.type === "vip") {
      t = t - t * 0.15;
    } else if (o.type === "guest") {
      t = t - t * 0.05;
    } else if (o.type === "employee") {
      t = t - t * 0.3;
    }
  }
  o.total = t;
  // guardar (simulado)
  console.log("saving", o.id, "for", o.userId, "total", t);
  // notificar
  console.log("sending email", o.userId);
  return { ok: true, id: o.id, total: t };
}


const o:Order = {
  id: 'order-1', userId: 'user-1', items:[ {name: 'Bread', price: 1.5, qty: 1}, {name: 'Milk', price: 0.9, qty: 2}], type: 'guest'
};

// Process the order
process(o);
