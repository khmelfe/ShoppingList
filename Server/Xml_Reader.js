const fs = require("fs"); // file system.
const xml2js = require("xml2js");//importing xml lib.

fs.readFile('/Users/felixkhmelnitsky/Desktop/Felix/קבצים/Shopping List/Shopping-List/ShoppingList/Server/XML_files/PriceFull7290696200003-068-202509100416-001.xml', "utf-8", (err, data) => {
  if (err) return console.error(err);

 

  xml2js.parseString(data, (err, result) => {
    if (err) return console.error(err);

    const sales = result?.Prices?.Products?.[0]?.Product || [];
    for (const Product of sales) {
      const desc = {ItemCode : Product?.ItemCode?.[0] ,
        Itemname : Product?.ItemName?.[0] ,
        ManufactorName:Product?.ManufactureName?.[0],
        ManufactorCountry:Product?.ManufactureCountry?.[0] || "none",
        ManufactorItemDescription:Product?.ManufactorItemDescription?.[0] || "none" ,
        Unitqty:Product?.UnitQty?.[0],
        QtyInPackage:Product?.QtyInPackage?.[0],
        ItemPrice:Product?.ItemPrice?.[0]
      } // <-- array by default
      console.log(desc);
      fs.writeFileSync("promos.txt", JSON.stringify(desc, null, 2), "utf8");
      if(desc.Itemname === "פריכיות תירס עם שומשום 150 גר`"){
        console.log("Great success")
      }
    }
   
  });
});
