let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];
let regionSelect = document.getElementById('region-select');
let productSelect = document.getElementById('product-select');
let tableWrapper = document.getElementById('table-wrapper');

regionSelect.addEventListener('change', function() {
  let data = getData();
  newTable(data);
})

productSelect.addEventListener('change', function() {
    let data = getData();
    newTable(data);
  })

function getData() {
  let regionindex = regionSelect.selectedIndex;
  let regionValue = regionSelect[regionindex].value;
  let productindex = productSelect.selectedIndex;
  let productValue = productSelect[productindex].value;
  let selectedData = [];
  for(let i = 0, len = sourceData.length; i < len; i++) {
    if (sourceData[i].region === regionValue && sourceData[i].product === productValue) {
      selectedData.push(sourceData[i]);
    }
  }
    return selectedData;
}

function newTable(data) {
  tableWrapper.innerHTML = '';
  let fragment = document.createDocumentFragment();
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  table.setAttribute('cellspacing', 0+"px");
  table.setAttribute('border', "1px solid black");
  let theadData = '<tr> <th>商品</th> <th>地区</th>';
  for (let i = 1; i <= 12; i++) {
    theadData += ' <th>' + i + '月'+ '</th>';
  }
  theadData += '</tr>';
  thead.innerHTML = theadData;
  table.appendChild(thead);
  for (let j = 0, len = data.length; j < len; j++) {
      let tr = document.createElement('tr');
      let td1 = document.createElement('td');
      td1.innerHTML = data[j].product;
      tr.appendChild(td1);
      let td2 = document.createElement('td');
      td2.innerHTML = data[j].region;
      tr.appendChild(td2);
    for (let k = 0; k < 12; k++) {
        var td3 = document.createElement('td');
        td3.innerHTML = data[j].sale[k];
        tr.appendChild(td3);
        tbody.appendChild(tr);
    }
  } 
    table.appendChild(tbody);
    fragment.appendChild(table);
    tableWrapper.appendChild(fragment);
}
