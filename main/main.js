'use strict';

const NAME = "name"
const UNIT = "unit"
const PRICE = "price"
const BARCODE = "barcode"
const SUBTOTAL = "subtotal"


function printReceipt(barcodes) {
  let aggregatedBarcodes = aggregateBarcode(barcodes);
  let aggregatedItems = mapBarcodesToItems(aggregatedBarcodes);
  let aggregatedItemsWithPrice = getItemsPrices(aggregatedItems);
  printItemsInReceiptFormat(aggregatedItemsWithPrice);
}

function aggregateBarcode(barcodes) {
  let barcodesCount = {};

  barcodes.forEach(barcode => {
    barcodesCount[barcode] = (barcodesCount[barcode] || 0) + 1;
  });

  return barcodesCount;
}

function mapBarcodesToItems(aggregatedBarcodes) {
  let allItems = loadAllItems();
  let cusItems = [];

  for (let aggregatedBarcode in aggregatedBarcodes) {
    let cusItem = allItems.filter(item => item["barcode"] == aggregatedBarcode)[0];
    cusItem["quantity"] = aggregatedBarcodes[aggregatedBarcode];
    cusItem["unit"] = cusItem["quantity"] > 1 ? cusItem["unit"] + "s" : cusItem["unit"];
    cusItems.push(cusItem); 
  };

  return cusItems;
}

function getItemsPrices(items) {
  let itemsWithPrice = [];
  
  items.forEach(item => {
    let itemWithPrice = item;
    itemWithPrice["Subtotal"] = item["price"] * item["quantity"];
    itemsWithPrice.push(itemWithPrice);
  });

  return itemsWithPrice;
}

function printItemsInReceiptFormat(items) {
  let output = "***<store earning no money>Receipt ***\n";
  let totalCost = 0;

  items.forEach(item => {
    output += "Name：" + item["name"] + "，Quantity：" + item["quantity"] + " " + item["unit"] + "，Unit：" + item["price"].toFixed(2) + " (yuan)，Subtotal：" + item["Subtotal"].toFixed(2) + " (yuan)\n";
    totalCost += item["Subtotal"];
  });

  output += "----------------------\n";
  output += "Total：" + totalCost.toFixed(2) + " (yuan)\n";
  output += "**********************";
  console.log(output);
}
