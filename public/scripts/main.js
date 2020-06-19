function traveldisp(){
    var checkBox = document.querySelector(".checkaddvisit");
    var text = document.querySelector(".travel");
    if (checkBox.checked == true){
    text.style.display = "block";
    } else {
    text.style.display = "none";
    }
}
// function validateform(){
//     var name=document.myform.getElementById("username");
//     if(username==null || username==""){
//         alert("Name can't be blank");
//         return false;
//     }
// }