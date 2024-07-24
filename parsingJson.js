function tableToJson(tableId) {
  var table = document.querySelector('#' + tableId);
  if (!table) {
      console.error('Table not found with id:', tableId);
      return null;
  }

  var data = [];
  var headers = [];

  // Get headers from the first row of tbody
  var tbody = table.querySelector('tbody');
  if (tbody) {
      var rows = tbody.querySelectorAll('tr');
      if (rows.length > 0) {
          // Extract headers from the first row
          var headerCells = rows[0].querySelectorAll('td');
          headerCells.forEach(cell => {
              var text = cell.textContent.trim();
              headers.push(text);
          });
          console.log('Headers:', headers); // Debugging line

          // Extract rows
          rows.forEach((row, rowIndex) => {
              if (rowIndex === 0) return; // Skip the header row
              var rowData = {};
              var cells = row.querySelectorAll('td');
              cells.forEach((cell, index) => {
                  var text = cell.textContent.trim();
                  if (headers[index]) {
                      rowData[headers[index]] = text;
                  }
              });
              data.push(rowData);
              console.log('Row data:', rowData); // Debugging line
          });
      } else {
          console.error('No rows found in tbody.');
      }
  } else {
      console.error('No tbody found.');
  }

  return data;
}

// Usage
var jsonResult = tableToJson('myTable');
console.log(JSON.stringify(jsonResult, null, 2));