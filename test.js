const fs = require("fs");
const path = require("path");

// JSON 파일 경로 설정
const filePath = path.join(__dirname, "crownTundra.json");

// JSON 파일 읽기
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  // JSON 파싱
  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (parseErr) {
    console.error("Error parsing JSON data:", parseErr);
    return;
  }

  // JSON 데이터 수정
  // jsonData.age += 1;  // 예: 나이를 1 증가

  jsonData.forEach((item) => {
    jsonData['idx'] = jsonData['No.'];
    delete jsonData['No.'];
    
    jsonData['name'] = jsonData['포켓몬'];
    delete jsonData['포켓몬'];
    
    delete item["타입"];
    
    jsonData['etc'] = jsonData['비고'];
    delete jsonData['비고'];

    if (jsonData.hasOwnProperty('비고')) {
      jsonData['etc'] = jsonData['비고'];
      delete jsonData['비고'];
    }
    
  });

  // 수정된 JSON 데이터 문자열화
  const updatedJsonData = JSON.stringify(jsonData, null, 2);

  // 수정된 JSON 파일 저장
  fs.writeFile(filePath, updatedJsonData, "utf8", (writeErr) => {
    if (writeErr) {
      console.error("Error writing JSON file:", writeErr);
    } else {
      console.log("JSON file updated successfully!");
    }
  });
});
