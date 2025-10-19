async function fetchP2PPrices() {
  const body = {
    page: 1,
    rows: 5,
    payTypes: [],
    asset: "USDT",
    fiat: "VES",
    tradeType: "BUY"
  };

  const buyRes = await fetch("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const buyData = await buyRes.json();
  const buyPrice = buyData.data[0]?.adv?.price || "—";

  body.tradeType = "SELL";
  const sellRes = await fetch("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const sellData = await sellRes.json();
  const sellPrice = sellData.data[0]?.adv?.price || "—";

  document.getElementById("buy").textContent = `Compra: ${buyPrice} VES`;
  document.getElementById("sell").textContent = `Venta: ${sellPrice} VES`;
}

fetchP2PPrices();
setInterval(fetchP2PPrices, 20000); // Actualiza cada 20 segundos