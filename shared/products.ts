export const products = [
  {
    id: 1,
    name: "NUWE 輕透素顏霜 (經典款)",
    price: "NT$ 880",
    image: "/product-feature.png",
    tag: "熱銷 TOP 1",
    description: "30ml 經典容量。一抹提亮，打造如雲朵般輕盈的偽素顏妝感。富含保濕成分，妝養合一，讓肌膚整天水潤透氣。",
    details: [
      "容量：30ml",
      "防曬係數：SPF 50+ PA++++",
      "適用膚質：全膚質適用，特別推薦敏感肌",
      "使用方法：保養後，取適量均勻塗抹於全臉"
    ],
    features: [
      "不傷膚、溫和配方",
      "質地輕薄如雲",
      "妝效自然提亮",
      "全天候持妝"
    ]
  },
  {
    id: 2,
    name: "NUWE 輕透素顏霜 (旅行版)",
    price: "NT$ 350",
    image: "/product-tube.png",
    tag: "便攜首選",
    description: "10ml 輕巧包裝。小巧好攜帶，隨時隨地補妝，保持完美氣色。適合旅行、出差或隨身攜帶。",
    details: [
      "容量：10ml",
      "防曬係數：SPF 50+ PA++++",
      "特色：真空按壓瓶設計，不僅衛生更能用盡最後一滴"
    ],
    features: [
      "輕巧便攜",
      "真空按壓設計",
      "隨時補妝",
      "衛生安全"
    ]
  },
  {
    id: 3,
    name: "NUWE 雲朵光感禮盒",
    price: "NT$ 1,680",
    image: "/product-gift-set.png",
    tag: "送禮推薦",
    description: "包含經典素顏霜 30ml + 旅行版 10ml，再贈送品牌訂製雲朵化妝包。給自己或閨蜜最貼心的呵護。",
    details: [
      "內容物：素顏霜 30ml x1 + 素顏霜 10ml x1 + 雲朵化妝包 x1",
      "包裝：品牌專屬禮盒包裝 (附提袋)",
      "限量發售"
    ],
    features: [
      "經典+旅行組合",
      "精美禮盒包裝",
      "贈雲朵化妝包",
      "送禮自用兩相宜"
    ]
  }
];

export type Product = typeof products[number];
