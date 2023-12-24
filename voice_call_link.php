<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $searchName = $_POST["search_name"];

    // MySQL에서 노래 정보를 가져옴
    $dbHost = "localhost"; // MySQL 호스트
    $dbUser = "root"; // MySQL 사용자
    $dbPass = ""; // MySQL 비밀번호
    $dbName = "music"; // MySQL 데이터베이스 이름

    $conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT file_name FROM songs WHERE song_name = '$searchName'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $fileName = $row["file_name"];

        // 음원 파일 경로 설정
        $filePath = "uploads/" . $fileName;

        // 음원 파일을 재생하는 코드 (여기서는 간단히 링크로 제공)
        echo "<a href='$filePath' download>Listen to $searchName</a>";
    } else {
        echo "Song not found.";
    }

    $conn->close();
}
?>
