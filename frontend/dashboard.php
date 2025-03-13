<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="frontend/style.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>Welcome to AI Medical Diagnosis Assistant</h2>
        <p>Hello, <?php echo $_SESSION['username']; ?>! You are now logged in.</p>

        <!-- Start Diagnosis Button -->
        <a href="index.html" class="start-btn">Start Diagnosis</a>

        <!-- Logout Button -->
        <a href="logout.php" class="logout-btn">Logout</a>
    </div>
</body>
</html>
