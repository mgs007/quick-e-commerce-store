export interface OrderPayload {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  customerName: string;
  phone: string;
  location?: string;
  preferredTime?: string;
  status: "new" | "processed";
  createdAt: string;
}

const LS_KEY = "om_orders";

function readOrders(): OrderPayload[] {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as OrderPayload[];
  } catch {
    return [];
  }
}

function writeOrders(orders: OrderPayload[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(orders));
}

export function listOrders(): OrderPayload[] {
  return readOrders().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createOrder(order: Omit<OrderPayload, "id" | "status" | "createdAt">) {
  const current = readOrders();
  const payload: OrderPayload = {
    ...order,
    id: crypto.randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  current.push(payload);
  writeOrders(current);

  // Best-effort: also persist to Supabase for admin dashboard later
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.from("orders").insert({
      product_id: null, // local seed IDs are not UUIDs; keep null
      product_name: payload.productName,
      product_price: payload.productPrice,
      customer_name: payload.customerName,
      phone: payload.phone,
      location: payload.location ?? null,
      preferred_time: payload.preferredTime ?? null,
      status: payload.status,
      created_at: payload.createdAt,
    });
  } catch (e) {
    // ignore; local storage remains the source for now
  }

  return payload;
}

export function markOrderProcessed(id: string) {
  const current = readOrders();
  const idx = current.findIndex((o) => o.id === id);
  if (idx >= 0) {
    current[idx].status = "processed";
    writeOrders(current);
  }
}
