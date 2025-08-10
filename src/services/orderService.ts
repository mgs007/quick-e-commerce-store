export interface OrderPayload {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  customerName: string;
  phone: string;
  location: string;
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

export function createOrder(order: Omit<OrderPayload, "id" | "status" | "createdAt">) {
  const current = readOrders();
  const payload: OrderPayload = {
    ...order,
    id: crypto.randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  current.push(payload);
  writeOrders(current);
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
