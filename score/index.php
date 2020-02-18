<!DOCTYPE html>
<html lang="nl-nl">
<head>
    <title>Score Invullen</title>
    
    <link rel="stylesheet" type="text/css" href="score.css?v=1" />
    <meta charset="UTF-8" />
</head>
<body>
<?php
$file = "scores.txt";

$rondeError = $veldError = $team1Error = $team2Error = "";

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
};

function test_range($data, $one, $two) {
    if($data >= $one && $data <= $two) {
        return true;
    } else {
        return false;
    };
};

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    if (empty($_POST["ronde"])) {
        $rondeError = "Dit veld is verplicht";
    } else {
        $ronde = test_input($_POST["ronde"]);
        if (!test_range($ronde, 1, 13)) {
            $rondeError = "Vul een getal tussen 1 en 13 in"; 
        };
    };
    
    if (empty($_POST["veld"])) {
        $veldError = "Dit veld is verplicht";
    } else {
        $veld = test_input($_POST["veld"]);
        if (!test_range($veld, 1, 2)) {
            $veldError = "Er zijn maar 2 velden..."; 
        };
    };
    
    if (empty($_POST["team1"])) {
        $team1Error = "Dit veld is verplicht";
    } else {
        $team1 = test_input($_POST["team1"]);
        if (!test_range($team1, 0, 50)) {
            $team1Error = "Vul een getal tussen 0 en 50 in"; 
        };
    };
    
    if (empty($_POST["team2"])) {
        $team2Error = "Dit veld is verplicht";
    } else {
        $team2 = test_input($_POST["team2"]);
        if (!test_range($team2, 0, 50)) {
            $team2Error = "Vul een getal tussen 0 en 50 in"; 
        };
    };
    
	
	
    if (empty($rondeError) && empty($veldError) && empty($team1Error) && empty($team2Error)) {
		$output = $ronde . "\t" . $veld . "\t" . $team1 . "\t" . $team2 . "\n";
		echo file_put_contents($file, $output, FILE_APPEND);
		
        echo "<p>test</p>";
    } else {
        ?>
		<h1>Score invullen</h1>
		<p>Vul de gegevens in zoals ze op het scherm staan, houdt ook de teamvolgorde van het scherm aan</p>
		<form action="<?php echo htmlspecialchars($_SERVER[" PHP_SELF "]);?>" method="post">
			<p>Ronde: <span style="color: red;"><?php echo $rondeError;?></span></p>
			<p><input type="number" min="1" max="13" inputmode="numeric" pattern="[1-13]"
				title="Getal tussen 1 en 13" name="ronde"></p>
			<p>Veld: <span style="color: red;"><?php echo $veldError;?></span></p>
			<p><input type="number" min="1" max="2" inputmode="numeric" pattern="[1-2]"
				title="Getal tussen 1 en 2" name="veld"></p>
			<p>Score Team 1: <span style="color: red;"><?php echo $team1Error;?></span></p>
			<p><input type="number" min="0" max="50" inputmode="numeric" pattern="[0-50]"
				title="Getal tussen 0 en 50" name="team1"></p>
			<p>Score Team 2: <span style="color: red;"><?php echo $team2Error;?></span></p>
			<p><input type="number" min="0" max="50" inputmode="numeric" pattern="[0-50]"
				title="Getal tussen 0 en 50" name="team2"></p>
			<p><input name="submit" type="submit" value="Instellen"></input></p>
		</form>
		
		<?php
    };
    
    
} else {
    ?>
<h1>Score invullen</h1>
<p>Vul de gegevens in zoals ze op het scherm staan, houdt ook de teamvolgorde van het scherm aan</p>
<form action="<?php echo htmlspecialchars($_SERVER[" PHP_SELF "]);?>" method="post">
    <p>Ronde:</p>
    <p><input type="number" min="1" max="13" inputmode="numeric" pattern="[1-13]"
        title="Getal tussen 1 en 13" name="ronde"></p>
    <p>Veld:</p>
    <p><input type="number" min="1" max="2" inputmode="numeric" pattern="[1-2]"
        title="Getal tussen 1 en 2" name="veld"></p>
	<p>Score Team 1:</p>
    <p><input type="number" min="0" max="50" inputmode="numeric" pattern="[0-50]"
        title="Getal tussen 0 en 50" name="team1"></p>
	<p>Score Team 2:</p>
    <p><input type="number" min="0" max="50" inputmode="numeric" pattern="[0-50]"
        title="Getal tussen 0 en 50" name="team2"></p>
    <p><input name="submit" type="submit" value="Instellen"></input></p>
</form>
<?php
};
?>
</body>
</html>