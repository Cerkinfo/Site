const JsBarcode = require('jsbarcode');

window.barcodeRender = (uuid) => {
  JsBarcode("#barcode", uuid, {
    width: 1,
    format: "code128",
  });
}

