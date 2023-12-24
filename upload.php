<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $targetDir = "uploads/"; // 음원 파일을 저장할 폴더 경로
    $songName = $_POST["song_name"];
    $fileName = $_FILES["file"]["name"];
    $targetFilePath = $targetDir . $fileName;

    // 파일을 지정된 경로로 이동
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        // MySQL에 노래 정보 저장
        $dbHost = "localhost"; // MySQL 호스트
        $dbUser = "root"; // MySQL 사용자
        $dbPass = ""; // MySQL 비밀번호
        $dbName = "music"; // MySQL 데이터베이스 이름

        $conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        // 인코딩 설정 추가
        $conn->set_charset("utf8mb4");
        

        $sql = "INSERT INTO songs (song_name, file_name) VALUES ('$songName', '$fileName')";
        if ($conn->query($sql) === TRUE) {
            echo "File uploaded and data inserted successfully.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        $conn->close();
    } else {
        echo "Error uploading the file.";
    }
}
?>
