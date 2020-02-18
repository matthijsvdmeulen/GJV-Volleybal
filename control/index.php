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
        $timefile = fopen("../counter.txt", "w") or die("Unable to open file!");
        fwrite($timefile, $timestamp);
        echo "FIle Written";
    } else {
        $ronde = $_POST["ronde"];
        $rondefile = fopen("../ronde.txt", "w") or die("Unable to open file!");
        fwrite($rondefile, $ronde);
        echo "FIle Written";
    }
}
$ronde = file_get_contents("../ronde.txt") or die("Unable to open file!");
echo $ronde;
?>
<h1>Instellingen</h1>
<form method="post">
    <p>Ronde:</p>
    <select name="ronde" >
        <?php
        
        for($i = 1; $i <= 15; $i++) {
            if($i == $ronde) {
                echo '<option value="' . $i . '" selected>' . $i . '</option>';
            } else {
                echo '<option value="' . $i . '">' . $i . '</option>';
            }
        }
        ?>
        <!-- <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option> -->
    </select>
    <p><input name="submit" type="submit" value="Instellen" /></p>
    <p>Timer:</p>
    <p><input name="submit" type="submit" value="Start" /></p>
</form>
</body>
</html>