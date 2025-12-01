// 1. 구글 스프레드시트 상단 메뉴에서 [확장 프로그램] > [Apps Script]를 클릭하세요.
// 2. 기존 코드를 모두 지우고 아래 코드를 복사해서 붙여넣으세요.
// 3. 코드를 저장(Ctrl+S)하고, 우측 상단 [배포] > [새 배포]를 클릭하세요.
// 4. [유형 선택] 톱니바퀴 > [웹 앱]을 선택하세요.
// 5. 설명: "Contact Form", 다음 사용자로서 실행: "나(Me)", 액세스 권한이 있는 사용자: "모든 사용자(Anyone)" (중요!)
// 6. [배포] 버튼을 누르고, 권한 승인 절차를 진행하세요. (고급 > 안전하지 않음으로 이동 > 허용)
// 7. 배포가 완료되면 "웹 앱 URL"이 나옵니다. 이 URL을 복사하세요.
// 8. main.js 파일의 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' 부분을 복사한 URL로 바꿔주세요.

function doPost(e) {
    try {
        // 1. 요청 데이터 파싱
        var data = JSON.parse(e.postData.contents);

        // 2. 현재 활성화된 시트 가져오기
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // 3. 헤더가 없으면 추가 (첫 번째 줄)
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(['타임스탬프', '이름/회사명', '이메일', '연락처', '문의내용']);
        }

        // 4. 데이터 추가
        sheet.appendRow([
            new Date(), // 구글 시트 시간 기준
            data.name,
            data.email,
            data.phone,
            data.message
        ]);

        // 5. 성공 응답 반환
        return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // 에러 발생 시
        return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
