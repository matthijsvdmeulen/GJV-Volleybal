<?php
require("./simple-json-db.class.php");
$db = new simple_json_db();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_POST["submit"] == "Start") {
        $timestamp = date("M d, Y G:i:s", time() + 600);
        $db->insert($timestamp, "counter");
        echo json_encode($db->getList("counter"));
    } else {
        $ronde = $_POST["ronde"];
        $db->insert($ronde, "ronde");
    }
} else {
    echo json_encode($db->getList());
}
?>