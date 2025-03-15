<?php
require("./simple-json-db.class.php");
$db = new simple_json_db();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_POST["counter"]) {
        $counter = $_POST["counter"];
        $db->insert($counter, "counter");
        echo json_encode($db->getList());
    } else if ($_POST["ronde"]) {
        $ronde = $_POST["ronde"];
        $db->insert($ronde, "ronde");
        echo json_encode($db->getList());
    } else if ($_POST["wedstrijdschema"]) {
        $schema = json_decode($_POST["wedstrijdschema"]);
        $db->insert($schema, "wedstrijdschema");
        echo json_encode($db->getList());
    } else {
        echo json_encode("No correct input has been given");
    }

} else {
    echo json_encode($db->getList());
}
?>