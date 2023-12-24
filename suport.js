// 음성 출력 함수
function speak(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
}

// 음성으로 날씨 정보를 출력하는 함수
async function speakWeatherInfo() {
    try {
        const response = await fetch(WEATHER_API_URL);
        const data = await response.json();

        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;

        const weatherInfo = `오늘의 날씨는 ${weatherDescription}이며, 기온은 ${temperature}도입니다.`;
        speak(weatherInfo);
    } catch (error) {
        console.error('날씨 정보를 가져오지 못했습니다.', error);
    }
}




const API_KEY = ''; // 발급받은 API 키를 여기에 입력해주세요
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&appid=${API_KEY}`;

//날씨 정보를 받아오고 출력하는 함수
async function getWeatherInfo() {
    try {
        const response = await fetch(WEATHER_API_URL);
        const data = await response.json();

        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;

        const weatherInfo = `오늘의 날씨: ${weatherDescription}, 기온: ${temperature}도`;
        alert(weatherInfo);
    } catch (error) {
        alert('날씨 정보를 가져오지 못했습니다. 다시 시도해주세요.');
    }
}

 let recognition;
        const outputElement = document.getElementById('output');

        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'ko-KR'; // 한국어 음성 인식 언어 설정

            // 음성 인식 시작 버튼 클릭 이벤트 처리
            document.getElementById('startSpeechRecognition').addEventListener('click', () => {
                recognition.start();
            });

            // 음성 인식 결과 처리
            recognition.onresult = function (event) {
    const resultIndex = event.resultIndex;
    const transcript = event.results[resultIndex][0].transcript;
    outputElement.textContent = transcript;
    processSpeech(transcript); // 음성 인식 결과 처리 함수 호출

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('PHP 처리 결과:', xhr.responseText);
                // PHP 처리 결과를 HTML 페이지에 추가
                var responseContainer = document.getElementById("phpResponseContainer");
                responseContainer.innerHTML = "<h2>PHP 처리 결과</h2><p>" + xhr.responseText + "</p>";
                // PHP 처리 결과를 여기에서 사용하거나 화면에 표시할 수 있습니다.
            } else {
                console.error('Error:', xhr.status, xhr.statusText);
            }
        }
    };

    // PHP 파일의 경로를 수정해주세요.
    xhr.open('POST', 'voice_call.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('search_name=' + encodeURIComponent(transcript));
};

        } else {
            alert('음성 인식 기능을 지원하지 않는 브라우저입니다.');
        }

        // 간단한 일정 객체 생성
        class Event {
            constructor(title, date) {
                this.title = title;
                this.date = date;
            }
        }

        // 일정 목록 배열
        const events = [];

        // 일정 추가 함수
        function addEvent(title, date) {
            const event = new Event(title, date);
            events.push(event);
        }

        // 일정 삭제 함수
        function removeEvent(index) {
            if (index >= 0 && index < events.length) {
                events.splice(index, 1);
            }
        }

       // 음성으로 일정 정보를 출력하는 함수
        function speakEvents() {
            if (events.length === 0) {
                speak('일정이 없습니다.');
            } else {
                let eventInfo = '일정은 ';
                for (let i = 0; i < events.length; i++) {
                const event = events[i];
                eventInfo += `${event.title} - ${event.date}. `;
            }
            speak(eventInfo);
    }
}


        // 음성 인식 결과를 처리하는 함수
        function processSpeech(transcript) {
            if (transcript.includes('새 일정 추가')) {
                // 음성으로 일정 추가
                extractEventFromTranscript(transcript);
            } else if (transcript.includes('일정 삭제')) {
                const index = prompt('삭제할 일정 번호를 입력하세요:');
                if (index) {
                    const eventIndex = parseInt(index) - 1;
                    removeEvent(eventIndex);
                    displayEvents(); // 일정 목록을 다시 표시
                    alert('일정이 삭제되었습니다.');
                }
            } else if (transcript.includes('일정 보기')) {
                // 일정 목록 보이기
                displayEvents();
            }  else if (transcript.includes('날씨 정보')) {
                  // 날씨 정보 조회
                speakWeatherInfo();
            } else if (transcript.includes('일정 읽어 주세요')) {
                // 일정 읽어 주세요
                speakEvents();
            } else {
                var responseContainer = document.getElementById("phpResponseContainer");
                responseContainer.innerHTML = '';
            }
        }


        // 음성으로 입력된 일정 정보 추출 및 추가
       function extractEventFromTranscript(transcript) {
    // 정규식을 사용하여 날짜 형식 (7월 23일)을 추출
    const dateRegex = /(\d{1,2}월 \d{1,2}일)/;
    const dateMatch = transcript.match(dateRegex);
    let date = '';

    if (dateMatch) {
        date = dateMatch[0]; // 날짜 형식을 date에 저장
    }

    const title = transcript.replace('새 일정 추가', '').replace(date, '').trim();

    if (title && date) {
        addEvent(title, date);
        displayEvents();
        alert('일정이 추가되었습니다.');
    } else {
        alert('일정 제목과 날짜를 포함하여 다시 말해주세요.');
    }
}
