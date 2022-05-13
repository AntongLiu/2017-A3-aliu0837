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

function deleteItem(type,index){
    const store = JSON.parse(localStorage.getItem('store')) || [[],[],[],[]]
    store[type].splice(index,1)
    console.log(store)
    localStorage.setItem('store',JSON.stringify(store))
    initItem()
}

function checkItem(type,index){
    const store = JSON.parse(localStorage.getItem('store')) || [[],[],[],[]]
    console.log(store[type])
    const o = _.cloneDeep(store[type][index])
    o.type = 3
    store[type].splice(index,1)
    store[3].push(o)
    localStorage.setItem('store',JSON.stringify(store))
    initItem()
}

function initItem(){
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

function saveItem(){
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
    window.location.href = 'todolist.html'
}
