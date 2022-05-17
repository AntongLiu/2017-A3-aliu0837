//Get item-html template
function getItem(obj,index,type) {
    return `
                    <div class="item">
                        <div class="check" onclick="checkItem(${type},${index})"></div>
                        <div class="info">
                            <div class="title">${obj.title}</div>
                            <p>${obj.info}</p>
                        </div>
                        <div class="tips">
                            <div class="time">${obj.time}</div>
                            <img src="img/tododel.png" alt="" onclick="deleteItem(${type},${index})">
                        </div>
                    </div>
  `
}

//Delete a to-do list
function deleteItem(type,index){
    const store = JSON.parse(localStorage.getItem('store')) || [[],[],[],[]]
    //Get the stored to-do items from local storage, if not return a two-dimensional array
    store[type].splice(index,1)
    //Delete from store based on index of item
    console.log(store)
    localStorage.setItem('store',JSON.stringify(store))
    //Set up again to ensure sync
    initItem()
}

//Complete a to-do list
function checkItem(type,index){
    const store = JSON.parse(localStorage.getItem('store')) || [[],[],[],[]]
    console.log(store[type])
    const o = _.cloneDeep(store[type][index])
    //Use lodash to copy objects once and avoid reference problems
    o.type = 3 //Fixed setting index of 3
    // HIGH PRIORITY 0
    // MEDIUM PRIORITY 1
    // LOW PRIORITY 2
    // COMPLETED 3
    store[type].splice(index,1)
    store[3].push(o)  //Add to store
    localStorage.setItem('store',JSON.stringify(store))
    initItem()
}

//Initialising the To Do List page
function initItem(){
    //Remove all to-do items from the page
    $("#u1").find('.item').remove()
    $("#u2").find('.item').remove()
    $("#u3").find('.item').remove()
    $("#u4").find('.item').remove()
    const store = JSON.parse(localStorage.getItem('store')) || [[],[],[],[]]
    store.forEach((item)=>{
        item.forEach((cur,curIndex)=>{
            $(".todoul").find('dd').eq(cur.type).append(getItem(cur,curIndex,cur.type))
        })
    })
}

//Save to-do list
function saveItem(){
    //Access Level
    const type = parseInt($("#level").val())
    const store = JSON.parse(localStorage.getItem('store')) || [[],[],[],[]]
    const obj = {
        title:$("#title").val(),
        info:$("#info").val(),
        time:$("#data").val() + ' ' +  $("#data2").val(),
        type
    }
    store[type].push(obj)
    localStorage.setItem('store',JSON.stringify(store))
    //Jump to the to-do list page after successful saving
    window.location.href = 'todolist.html'
}
