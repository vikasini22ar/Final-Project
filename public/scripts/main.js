// function to display the date
function traveldisp(){
    var checkBox = document.querySelector(".checkaddvisit");
    var text = document.querySelector(".travel");
    if (checkBox.checked == true){
    text.style.display = "block";
    } else {
    text.style.display = "none";
    }
}
// function to validate the form
function validateform(){
    var name=document.myform.name.value;
    var password=document.myform.password.value;
    var email=document.myform.email.value;
    var phone=document.myform.phone.value;
    var username=document.myform.username.value;

    var text=document.querySelector(".error");
    
    if((name==null || name=="")||(password==null || password=="")||(email==null||email=="")||(phone==null || phone=="")||(username==null || username=="")){
        // alert("Name can't be blank");
        // console.log("cant be blank");
        text.style.display="block";
        return false;
    }else{
        return true;
        text.style.display="none";
    }
}
