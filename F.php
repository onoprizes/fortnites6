<?php

header("Access-Control-Allow-Origin: *");

error_reporting(0);
ini_set('display_errors', 0);

$FNUSERNAME = $_GET["U"];

$FNPLATFORM = $_GET["P"];

$OP1 = array(
    'http'=>array(
      'method'=>"GET",
      'header'=>"Authorization: e1f24aff-92653210-573739b9-10842371\r\n"
    )
  );

  $LOOKUP = "https://fortniteapi.io/lookup?username=" . urlencode($FNUSERNAME);

  if ($FNPLATFORM == "psn" OR $FNPLATFORM == "xbl") {
    $LOOKUP = "https://fortniteapi.io/lookup?username=" . urlencode($FNUSERNAME) . "&platform=" . $FNPLATFORM;
  }
  
  $CO1 = stream_context_create($OP1);
  
  $FI1 = file_get_contents($LOOKUP, false, $CO1);

  //echo $FI1;

  $FI1 = json_decode($FI1, true);

  //var_dump($FI1);

  //echo $FI1["account_id"];

  if ($FI1["result"] == false) {

    $LOL;

    $LOL = $FI1["code"];

    if ($LOL == NULL) {
      $LOL = $FI1["error"];

      if ($LOL == NULL) {
        $LOL = "DEAD";
      }

    }

    $arr2 = array("result" => false, "error" => $LOL);

    echo json_encode($arr2);

  } else {

    $OP2 = array(
      'http'=>array(
        'method'=>"GET",
        'header'=>"Authorization: e1f24aff-92653210-573739b9-10842371\r\n"
      )
    );
    
    $CO2 = stream_context_create($OP2);
    
    $FI2 = file_get_contents("https://fortniteapi.io/stats?account=" . $FI1["account_id"], false, $CO2);
  
    //echo $FI2 . "<br><br><br><br>";
  
    $FI2 = json_decode($FI2, true);
  
    $FIRSTKEY = array_key_first($FI2["global_stats"]); //FIRST GLOBAL STAT
  
    $arr = array("result" => true, "name" => $FI2["name"], "level" => $FI2["account"]["level"], "playmode" => $FIRSTKEY, "winrate" => round($FI2["global_stats"][$FIRSTKEY]["winrate"] * 100, 2), "wins" => $FI2["global_stats"][$FIRSTKEY]["placetop1"], "kd" => round($FI2["global_stats"][$FIRSTKEY]["kd"], 2), "kills" => $FI2["global_stats"][$FIRSTKEY]["kills"], "matches" => $FI2["global_stats"][$FIRSTKEY]["matchesplayed"]);
      
    echo json_encode($arr);

  }

?>