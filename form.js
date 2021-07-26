var flag = "create";
async function postdata(){
    try {
        var data = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value
        }

        if( flag == "create"){
        var  postinfo = await fetch("https://60fd96471fa9e90017c70f06.mockapi.io/userform",{  
             method:"post",
             Headers: {
                 "content-type" : "application/json"
             },
                 body : json.stringify(data)
            })
            var resInfo = postinfo.json();
        }
        getdata()
        if(flag == "edit"){
            var  postinfo = await fetch("https://60fd96471fa9e90017c70f06.mockapi.io/userform",{
             method:"put",
             Headers: {
                 "content-type" : "application/json"
             },
             body : json.stringify(data)
            })
            var resInfo = postinfo.json();
        }
         getdata()
    } catch (error) {
        console.log(error)
    }

}

async function getdata(){
    var data = await fetch("https://60fd96471fa9e90017c70f06.mockapi.io/userform/");
    var resp = await data.json();
    document.getElementById("datatable").innerText = " "
    resp.forEach(row => {
        var tr = document.createElement("tr");
        var nameTd = document.createElement("td");
        var ageTd = document.createElement("td");
        var actionTd = document.createElement("td");


        nameTd.innerText = row.name;
        ageTd.innerText = row.age;

        var editBtn = document.createElement("button");
        var delBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.setAttribute("onclick","editdata("+row.id+")")
        delBtn.innerText = "Delete";
        delBtn.setAttribute("onclick","deletedata("+row.id+")")
        actionTd.appendChild(editBtn)
        actionTd.appendChild(delBtn)
        

        tr.appendChild(nameTd);
        tr.appendChild(ageTd);
        tr.appendChild(actionTd);
        document.getElementById("datatable").appendChild(tr);
        
    });

    async function deletedata(id){
        var deletedata = await fetch("https://60fd96471fa9e90017c70f06.mockapi.io/userform/"+id,{
        method: "DELETE"
        
    })
        var respDel = deletedata.json();
        getdata()
    }

    async function editData(id){
                var rowData = await fetch("https://60fd96471fa9e90017c70f06.mockapi.io/userform/"+id);
                var rowResp = await rowData.json();

                document.getElementById("name").value = rowResp.name;
                document.getElementById("age").value = rowResp.age;
                flag = "edit";
                selectedId = id;
    }
}
getdata()  