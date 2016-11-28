const JsBarcode = require('jsbarcode');

window.barcodeRender = (card_id) => {
  JsBarcode("#barcode", card_id, {
    width: 3,
    text: card_id.slice(0,3) + "-" + card_id.slice(3,6),
    format: "code128",
  });
}

