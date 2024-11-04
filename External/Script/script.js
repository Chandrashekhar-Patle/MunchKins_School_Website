lightGallery(document.querySelector('.gallery .gallery-container'));

let a =document.querySelector(".dropdown-content");
let icon=document.querySelector(".icons");

let count=1;
icon.addEventListener("click", function(){
if(count==1){
a.style.display="block";
count=0;
}
else{
a.style.display="none";
count=1;
}
})
