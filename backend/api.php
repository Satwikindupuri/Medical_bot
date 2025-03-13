<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $symptoms = isset($_POST["symptoms"]) ? $_POST["symptoms"] : [];

    $data = json_encode(["symptoms" => $symptoms]);

    $url = "http://127.0.0.1:5000/predict"; // Flask API URL

    $options = [
        "http" => [
            "header" => "Content-type: application/json",
            "method" => "POST",
            "content" => $data
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);

    echo $response;
}
?>
