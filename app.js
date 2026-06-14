let pets = JSON.parse(localStorage.getItem("pets")) || [];
let records = JSON.parse(localStorage.getItem("records")) || [];

function saveData(){
    localStorage.setItem("pets",JSON.stringify(pets));
    localStorage.setItem("records",JSON.stringify(records));
}
function addPet(){
    const name =
        document.getElementById("name").value.trim();
    const age =
        document.getElementById("age").value;
    const type =
        document.getElementById("type").value;
    if(name === "" || age === ""){
        alert("모든 정보를 입력해주세요.");
        return;
    }
    pets.push({
        id: Date.now(),
        name,
        age,
        type
    });
    saveData();
    alert("반려동물이 등록되었습니다.");
    window.location.href = "index.html";
}
function renderPets(){
    const list =
        document.getElementById("petList");
    if(!list) return;
    list.innerHTML = "";
    pets.forEach(pet=>{
        list.innerHTML += `
        <div class="card">
            <h3>${pet.name}</h3>
            <p>종류 : ${pet.type}</p>
            <p>나이 : ${pet.age}세</p>
        </div>
        `;
    });
}
function loadPetSelect(){
    const select =
        document.getElementById("petSelect");
    if(!select) return;
    pets.forEach(pet=>{
        select.innerHTML += `
        <option value="${pet.id}">
            ${pet.name}
        </option>
        `;
    });
}
function addRecord(){
    const petId =
        document.getElementById("petSelect").value;
    const meal =
        document.getElementById("meal").value;
    const activity =
        document.getElementById("activity").value.trim();
    if(petId === ""){
        alert("반려동물을 선택해주세요.");
        return;
    }
    if(activity === ""){
        alert("기록을 입력해주세요.");
        return;
    }
    records.push({
        petId,
        meal,
        activity,
        date:new Date().toLocaleDateString()
    });
    saveData();
    alert("기록이 저장되었습니다.");
    window.location.href = "index.html";
}
function renderRecords(){
    const area =
        document.getElementById("recordList");
    if(!area) return;
    area.innerHTML = "";
    records.forEach(record=>{
        const pet =
            pets.find(
                p=>p.id == record.petId
            );
        area.innerHTML += `
        <div class="card">
            <h3>${pet ? pet.name : "삭제된 동물"}</h3>
            <p>날짜 : ${record.date}</p>
            <p>식사 : ${record.meal}</p>
            <p>기록 : ${record.activity}</p>
        </div>
        `;
    });
}
renderPets();
loadPetSelect();
renderRecords();