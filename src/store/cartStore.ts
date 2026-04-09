import type { Exam } from "@/data/exams";

export type CartItem = {
  exam: Exam;
  quantity: number;
  forThirdParty: boolean;
  thirdPartyName?: string;
  thirdPartyCpf?: string;
  thirdPartyRelation?: string;
};

export type CustomerInfo = {
  name: string;
  phone: string;
  cpf: string;
};

export type LocationInfo = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  unit: "bacabal" | "satubinha" | "domiciliar";
  guiaFile?: string;
  guiaFileName?: string;
};

export type PaymentInfo = {
  method: "credit" | "pix" | "cash";
  changeFor?: number;
};

export type CartState = {
  items: CartItem[];
  customer: CustomerInfo;
  location: LocationInfo;
  payment: PaymentInfo;
  protocol: string;
  step: number;
  drawerOpen: boolean;
};

export type CartAction =
  | { type: "ADD_ITEM"; exam: Exam }
  | { type: "REMOVE_ITEM"; slug: string }
  | { type: "UPDATE_QUANTITY"; slug: string; quantity: number }
  | { type: "TOGGLE_THIRD_PARTY"; slug: string; value: boolean }
  | { type: "SET_THIRD_PARTY_INFO"; slug: string; name: string; cpf: string; relation: string }
  | { type: "SET_CUSTOMER"; customer: Partial<CustomerInfo> }
  | { type: "SET_LOCATION"; location: Partial<LocationInfo> }
  | { type: "SET_PAYMENT"; payment: Partial<PaymentInfo> }
  | { type: "SET_STEP"; step: number }
  | { type: "SET_PROTOCOL"; protocol: string }
  | { type: "TOGGLE_DRAWER" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "CLEAR_CART" };

export const initialCartState: CartState = {
  items: [],
  customer: { name: "", phone: "", cpf: "" },
  location: {
    cep: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    unit: "bacabal",
  },
  payment: { method: "pix" },
  protocol: "",
  step: 0,
  drawerOpen: false,
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.exam.slug === action.exam.slug);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.exam.slug === action.exam.slug
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { exam: action.exam, quantity: 1, forThirdParty: false }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.exam.slug !== action.slug),
      };

    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.exam.slug !== action.slug),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.exam.slug === action.slug ? { ...i, quantity: action.quantity } : i
        ),
      };

    case "TOGGLE_THIRD_PARTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.exam.slug === action.slug ? { ...i, forThirdParty: action.value } : i
        ),
      };

    case "SET_THIRD_PARTY_INFO":
      return {
        ...state,
        items: state.items.map((i) =>
          i.exam.slug === action.slug
            ? {
                ...i,
                thirdPartyName: action.name,
                thirdPartyCpf: action.cpf,
                thirdPartyRelation: action.relation,
              }
            : i
        ),
      };

    case "SET_CUSTOMER":
      return { ...state, customer: { ...state.customer, ...action.customer } };

    case "SET_LOCATION":
      return { ...state, location: { ...state.location, ...action.location } };

    case "SET_PAYMENT":
      return { ...state, payment: { ...state.payment, ...action.payment } };

    case "SET_STEP":
      return { ...state, step: action.step };

    case "SET_PROTOCOL":
      return { ...state, protocol: action.protocol };

    case "TOGGLE_DRAWER":
      return { ...state, drawerOpen: !state.drawerOpen };

    case "OPEN_DRAWER":
      return { ...state, drawerOpen: true };

    case "CLOSE_DRAWER":
      return { ...state, drawerOpen: false };

    case "CLEAR_CART":
      return { ...initialCartState };

    default:
      return state;
  }
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.exam.price * i.quantity, 0);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function generateProtocol(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `HML-${date}-${rand}`;
}

export function buildWhatsAppMessage(state: CartState): string {
  const { items, customer, location, payment, protocol } = state;
  const total = getCartTotal(items);

  const unitNames: Record<string, string> = {
    bacabal: "Matriz — Bacabal",
    satubinha: "Unidade Satubinha",
    domiciliar: "Coleta Domiciliar",
  };

  const paymentNames: Record<string, string> = {
    credit: "Cartão de Crédito",
    pix: "Pix",
    cash: "Dinheiro",
  };

  const itemLines = items
    .map((i) => {
      let line = `• ${i.exam.name} (R$ ${i.exam.price.toFixed(2)})`;
      if (i.quantity > 1) line += ` x${i.quantity}`;
      if (i.forThirdParty && i.thirdPartyName) {
        line += `\n  ↳ Para: ${i.thirdPartyName} (${i.thirdPartyRelation || "Familiar"})`;
      }
      return line;
    })
    .join("\n");

  let msg = `🧪 *Novo Pedido HemoLab*\n`;
  msg += `📋 Protocolo: *${protocol}*\n\n`;
  msg += `*Exames:*\n${itemLines}\n\n`;
  msg += `💰 *Total: R$ ${total.toFixed(2)}*\n\n`;
  msg += `*Paciente:* ${customer.name}\n`;
  msg += `*CPF:* ${customer.cpf}\n`;
  msg += `*Telefone:* ${customer.phone}\n\n`;
  msg += `*Unidade:* ${unitNames[location.unit] || location.unit}\n`;

  if (location.unit === "domiciliar" && location.street) {
    msg += `*Endereço:* ${location.street}, ${location.neighborhood} - ${location.city}/${location.state} - CEP: ${location.cep}\n`;
  }

  msg += `*Pagamento:* ${paymentNames[payment.method] || payment.method}\n`;

  if (payment.method === "cash" && payment.changeFor) {
    msg += `*Troco para:* R$ ${payment.changeFor.toFixed(2)}\n`;
  }

  if (location.guiaFileName) {
    msg += `\n📎 *Guia Médica:* ${location.guiaFileName} (anexada)`;
  }

  return msg;
}

export function buildWhatsAppUrl(message: string): string {
  const phone = "5599981866145";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
