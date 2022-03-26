console.log("Welcome to my note app")
shownotes();
// User adds a note here then do this

let addbtn=document.getElementById("addbtn");
addbtn.addEventListener("click",function(e){
    let addtext=document.getElementById("addtext");
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesobj=[];
        
    }else{
        notesobj=JSON.parse(notes);
    }
    notesobj.push(addtext.value);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    addtext.value="";
    shownotes();
});

function shownotes(){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesobj=[];
    }else{
        notesobj=JSON.parse(notes);
    }
    let html="";
    notesobj.forEach(function(element,index){
        html+=`
        <div class="notecard" >
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deletenote(this.id)" class="btn">Delete Note</button>
                    </div>
                </div>`
    });
    let noteselm=document.getElementById("notes");
    if(notesobj.length!=0){
        noteselm.innerHTML=html;
    }else{
        noteselm.innerHTML=`No notes are saved here!`
    }
}

// delete
function deletenote(index){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesobj=[];
    }else{
        notesobj=JSON.parse(notes);
    }
    notesobj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    shownotes();
}

// searching
let searchtext=document.getElementById('searchtext');
searchtext.addEventListener("input",function(){
    let inputvalue=searchtext.value.toLowerCase();
    
    let notecard=document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function(element){
        let cardtest=element.getElementsByTagName('p')[0].innerText;
        if(cardtest.includes(inputvalue)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
        
    })
})