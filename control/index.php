<?php
require("./simple-json-db.class.php");
$db = new simple_json_db();
?>

<!DOCTYPE html>
<html lang="nl-nl">
<head>
    <title>Instellingen</title>
    
    <link rel="stylesheet" type="text/css" href="control.css?v=1" />
    <meta charset="UTF-8" />
</head>
<body>
<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "posted";
    if ($_POST["submit"] == "Start") {
        $timestamp = date("M d, Y G:i:s", time() + 600);
        $db->insert($timestamp, "counter");
    } else {
        $ronde = $_POST["ronde"];
        $db->insert($ronde, "ronde");
    }
}

?>
<h1>Instellingen</h1>
<form method="post">
    <p>Ronde:</p>
    <select name="ronde" >
        <?php
        
        for($i = 1; $i <= 15; $i++) {
            if($i == $db->getSingle("ronde")) {
                echo '<option value="' . $i . '" selected>' . $i . '</option>';
            } else {
                echo '<option value="' . $i . '">' . $i . '</option>';
            }
        }
        ?>
    </select>
    <p><input name="submit" type="submit" value="Instellen" /></p>
    <p>Timer:</p>
    <p><input name="submit" type="submit" value="Start" /></p>
</form>
</body>
</html>