
var slider = document.getElementById("VB");

var PL;

var SS = [];

var VB = 5000;

var SSUSER;

noUiSlider.create(slider, {
    start: 5000,
    range: {
        "min": 1000,
        "max": 13500
    }
});

slider.noUiSlider.on("update", function (values, handle) {
    VB = Math.round(values[handle]);
    $("#VBP").addClass("duration-500");
    $("#VBa").text(Math.round(values[handle]) + " V-Bucks");
    //console.log(Math.round((values[handle]/13500)*100)) //Procentowa ilość VB
    //console.log(20 + (Math.round((values[handle]/13500)*100)/4)) //Wzór na wielkość V-Bucksów
    //console.log(((20 + (Math.round((values[handle]/13500)*100)/4))/2) + 1.25) //Wysokość VBP
    $(".VBF").css("width", Math.round(25 + (Math.round((values[handle]/13500)*100)/4)) + "%");
    
    if ($(window).width() > 1023) {
        //
    } else {
        $("#VBP").css("height", ((25 + (Math.round((values[handle]/13500)*100)/4))/2) + 1.25 + "vh");
    }

});

function S1() {
    $(".S1").fadeOut(1000, function() {
        $("body").css("background-color", "rgb(68, 15, 104)");
        $("body").css("background-image", "none");
        $(".S2").fadeIn(1000, function() {
            //$("body").css("background-color", "rgb(68, 15, 104)");
            //$("body").css("background-image", "none");
        }).css("display", "flex");
    })
}

var APIDEAD = true;


function S3() {
    $(".VBUCKS").fadeOut(1000, function() {
        $(".SKINS").fadeIn(1000);
    })
}

function S4() {

    if (SS.length > 0) {
        $("#SS").text(SS.join(", "));
        $("#SSUSER").html(SSUSER);
        $("#SSVB").text(VB);
        $(".SKINS").fadeOut(1000, function() {
            $(".SUMMARY").fadeIn(1000);
        })
    } else {
        alert("Select at least one skin to continue.");
    }
}

function PLATFORM(xD) {
    //console.log($("img", xD).attr("src"));
    //console.log($(xD).attr("id"));

    PL = $(xD).attr("id");

    //console.log(PL);

    $(".PL").addClass("duration-500");
    $(".PL").not(xD).removeClass("opacity-50").removeClass("opacity-100").addClass("opacity-25");
    $(xD).removeClass("opacity-50").removeClass("opacity-25").addClass("opacity-100");
}

function SKIN(Dx) {
    $(".SK").addClass("duration-500");

    //console.log($(Dx).attr("id"));
    if ($(Dx).hasClass("opacity-100") == true) {

        SS.splice(SS.indexOf($("h5", Dx).text()), 1)

        //console.log("odznaczanie")
        $(Dx).removeClass("opacity-100").addClass("opacity-50"); //Odznaczanie
        $("img", Dx).removeClass("FORTNITE-YELLOW-BORDER").addClass("border-transparent");
    } else {

        if (SS.indexOf($("h5", Dx).text()) === -1) {
            SS.push($("h5", Dx).text());
        }

        //console.log("zaznaczanie")
        $(Dx).removeClass("opacity-50").addClass("opacity-100"); //Zaznaczanie
        $("img", Dx).removeClass("border-transparent").addClass("FORTNITE-YELLOW-BORDER");
    }

    //console.log(SS);

}

function S5() {
    $(".API-2").fadeOut(1000, function() {
        $(".VBUCKS").fadeIn(1000);
    })
}

function LAST() {
    $(".LAST").fadeOut(1000, function() {
        $(".VER").fadeIn(1000);
    })
}

function FLICK() {

    FUSER = $("#FUSER").val();
    //FPLATFORM = $("#FNPLATFORM").val();
  
    if (FUSER == "" || !PL) {

      alert("Enter your Fortnite username and select your platform.")

    } else {

        SSUSER = '<span id="USERUSERUSER">' + FUSER + '</span><small class="opacity-80 ml-1" id="PLPLPL">(' + PL + ')</small>'
  
      $("#APIBUTTON").prop("disabled", true).addClass("opacity-60");
  
      $.ajax({
        timeout: 10000,
        url: "F.php?U=" + encodeURIComponent(FUSER) + "&P=" + PL,
        success: function(DATA) {
            var DATA2 = DATA;
            
            if (DATA2.includes("Warning")) {
                
                $(".API-1").fadeOut(1000, function() {
                    $(".VBUCKS").fadeIn(1000);
                })

            } else {
                DATA = JSON.parse(DATA);
                if (DATA["result"] == true) {

                    //console.log(DATA);
        
                    $(".API-1").fadeOut(1000, function() {

                        //console.log("xD");
        
                        $("#USERUSER").text(DATA["name"]);
                        $("#PLPL").text("(" + PL + ")");
                        $("#MATCHES").text(DATA["matches"]);
                        $("#WINRATE").text(DATA["winrate"] + "%");
                        $("#KILLS").text(DATA["kills"]);
                        $("#KDRATIO").text(DATA["kd"]);
        
                        $(".API-2").fadeIn(1000);
                        
        
                    })
        
        
                } else {
                    if (DATA["error"].includes("not exist")) {

                        //Wrong username
                        
                        //console.log(DATA["error"]);

                        $(".API-1").fadeOut(1000, function() {
                            $(".VBUCKS").fadeIn(1000);
                        })

                    } else {
                        //console.log(DATA["error"]);

                        $(".API-1").fadeOut(1000, function() {
                            $(".VBUCKS").fadeIn(1000);
                        })

                    }
                }
            }
    
      },
      error: function() {
    
        //console.log("TIMEOUT OR SOMETHING ELSE");
    
        $(".API-1").fadeOut(1000, function() {
            $(".VBUCKS").fadeIn(1000);
        })
        
      }
    })
  
  
  
    }
  
}