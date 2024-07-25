let id=0;
let tasklist=JSON.parse(localStorage.getItem('tasklist'))||[];
writeHtml();

function saveToStorage(){
    localStorage.setItem('tasklist',JSON.stringify(tasklist));
}   

function writeHtml(){
    let tasksHTML='';
    tasklist.forEach((task)=>{
        tasksHTML+=`
        <i class="fa-solid fa-circle" style="color: #FFD43B;"></i>
        <p style="display: inline;">${task.task}</p>
        <button data-task-id="${task.id}" class="js-remove"><i class="fa-solid fa-check js-remove" data-task-id="${task.id}"></i></button><br>
        `
    })
    document.querySelector('.js-task-container').innerHTML=tasksHTML;
    document.querySelector('.js-input-task').value='';
    
}


document.querySelector('.js-submit-task').addEventListener('click',()=>{   
let task= document.querySelector('.js-input-task').value;
tasklist.push({
    task:task,
    id:++id
})
writeHtml();
saveToStorage();
})



document.querySelector('.js-input-task').addEventListener('keydown',(event)=>{
    if(event.key=='Enter'){
   
    let task= document.querySelector('.js-input-task').value;
    tasklist.push({
        task:task,
        id:++id
    })
    
    writeHtml();
    saveToStorage();
    
    } 
    })
    


document.querySelector('.js-task-container').addEventListener('click',(event)=>{
    if(event.target.classList.contains('js-remove')){
        let id=parseInt(event.target.dataset.taskId);
        let i=0;
        while(i<=tasklist.length-1){
            if(tasklist[i].id===id){
                break;
            }
            i++;
        }
        i===tasklist.length-1?tasklist.pop():tasklist.splice(i,1);
        writeHtml();
        saveToStorage();
    }

})