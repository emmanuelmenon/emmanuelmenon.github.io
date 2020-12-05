function navCheck() {
    var overlayContent = document.getElementsByClassName("overlayContent");
    console.log(overlayContent[1]);
    if (overlayContent[1].style.display == "inline-block") /* if opened, then close*/ {
        for (var i=0; i<overlayContent.length; i++) {
            overlayContent[i].style.display = "none";
        }
        document.getElementById("navBar").style.removeProperty("height");
    } else /* if closed, then open*/ {
        for (var i=0; i<overlayContent.length; i++) {
            overlayContent[i].style.display = "inline-block";
        }
        document.getElementById("navBar").style.height = "auto";
    }
}
