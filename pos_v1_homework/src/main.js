function loadAllItems()
{
  return [
  {
    barcode:'ITEM000000',
    name:'可口可乐',
    unit:'瓶',
    price:3.00
  },
  {
    barcode:'ITEM000001',
    name:'雪碧',
    unit:'瓶',
    price:3.00
  },
  {
    barcode:'ITEM000002',
    name:'苹果',
    unit:'斤',
    price:5.50
  },
  {
    barcode:'ITEM000003',
    name:'荔枝',
    unit:'斤',
    price:15.00
  },
  {
    barcode:'ITEM000004',
    name:'电池',
    unit:'个',
    price:2.00
  },
  {
    barcode:'ITEM000005',
    name:'方便面',
    unit:'袋',
    price:4.50
  }
  ];
}


function loadPromotions()
{
  return[
  {
    type:'BUY_TWO_GET_ONE_FREE',
    barcode:[
    'ITEM000000',
    'ITEM000001',
    'ITEM000005'
    ]
  }
  ];
}


function printInventory(input)
{
  var store = [
    {
      buy:0,
      send:0
    },
    {
      buy:0,
      send:0
    },
    {
      buy:0,
      send:0
    },
    {
      buy:0,
      send:0
    },
    {
      buy:0,
      send:0
    },
    {
      buy:0,
      send:0
    }
  ]

    for(i=0;i<input.length;i++)
    {
      var numberString;
      var idCode;
      idCode = parseInt(input[i].substr(input[i].lastIndexOf('0')+1,10));
      if(input[i].length > 10)
      {
         store[idCode].buy = store[idCode].buy+ parseInt(input[i].substr(11));
      }
      else if (input[i].length == 10)
      {
          store[idCode].buy = store[idCode].buy+ 1;

      }
      else
      {
          alert("the input of the barcode is wrong,please check carefully");
          return false;
      }
    }

    var twoSendOne = loadPromotions();
    var allItems = loadAllItems();
    for(j=0;j<twoSendOne[0].barcode.length;j++)
    {
       // var location = twoSendOne[0].barcode[j].lastIndexOf('0')+1;
        var tempt  = parseInt(twoSendOne[0].barcode[j].substr(5,10));

       if(store[tempt].buy>2)
       {
        store[tempt].send = 1;
       }
    }


    var string = '***<没钱赚商店>购物清单***\n';
    var sendString = '----------------------\n'+'挥泪赠送商品：\n';
    var totalValue = 0;
    var saveValue = 0;
   for(i=0;i<store.length;i++)
    {
      for(j=0;j<allItems.length;j++)
        {
          if(store[i].buy != 0)
          {

              if( i == parseInt(allItems[j].barcode.substr(allItems[j].barcode.lastIndexOf('0')+1,10))
          && store[i].send == 0)
              {
                     var total = store[i].buy*allItems[j].price;
                        string += '名称：'+allItems[j].name+
                        '，数量：'+store[i].buy+allItems[j].unit+
                        '，单价：'+allItems[j].price.toFixed(2)+'(元)'+
                        '，小计：'+total.toFixed(2)+'(元)\n';
                      totalValue += total;

               }
              else if(i == parseInt(allItems[j].barcode.substr(allItems[j].barcode.lastIndexOf('0')+1,10))
          && store[i].send == 1)
             {
                    var total = (store[i].buy-store[i].send)*allItems[j].price;
                        string = string + '名称：'+allItems[j].name+
                        '，数量：'+store[i].buy+allItems[j].unit+
                        '，单价：'+allItems[j].price.toFixed(2)+'(元)'+
                        '，小计：'+total.toFixed(2)+'(元)\n';
                     sendString += '名称：'+allItems[j].name+
                            '，数量：'+store[i].send+allItems[j].unit+'\n';
                      totalValue += total;
                      saveValue += allItems[j].price;

             }
          }
    }
 }
    var temptString = string+sendString+'----------------------\n'+'总计：'+totalValue.toFixed(2)+'(元)\n'+'节省：'+saveValue.toFixed(2)+'(元)\n'+'**********************';
    console.log(temptString);
}
