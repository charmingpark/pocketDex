const fs = require("fs");
const path = require("path");

// JSON 파일 경로 설정
const filePath = path.join(__dirname, "./JSON/crownTundra.json");

// JSON 파일 읽기
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  try {
    // JSON 데이터 파싱
    let jsonData = JSON.parse(data);

    // "타입" 키 삭제 및 "비고" 키를 "etc"로 변경하는 함수
    const modifyKeys = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(modifyKeys);
      } else if (obj && typeof obj === 'object') {
        const newObj = {};
        
        // "타입" 키 삭제
        if (obj.hasOwnProperty('타입')) {
          delete obj['타입'];
        }

        // "비고" 키를 "etc"로 변경
        if (obj.hasOwnProperty('비고')) {
          obj['etc'] = obj['비고'];
          delete obj['비고'];
        }

        // 기존 키들 순서 유지하며 "etc" 제외한 모든 키 추가
        Object.keys(obj).forEach(key => {
          if (key !== 'etc') {
            newObj[key] = obj[key];
          }
        });

        // 마지막에 "etc" 키 추가
        if (obj.hasOwnProperty('etc')) {
          newObj['etc'] = obj['etc'];
        }

        return newObj;
      }
      return obj;
    };

    // JSON 데이터 수정
    jsonData = modifyKeys(jsonData);

    // 수정된 JSON 데이터를 문자열로 변환
    const updatedData = JSON.stringify(jsonData, null, 2);

    // 파일에 저장
    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('파일 저장 오류:', err);
      } else {
        console.log('파일이 성공적으로 수정되었습니다.');
      }
    });

  } catch (parseErr) {
    console.error('JSON 파싱 오류:', parseErr);
  }
});
