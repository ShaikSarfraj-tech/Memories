


// async function getapi(url) {
    
//     // Storing response
//     const response = await fetch(url);
    
//     // Storing data in form of JSON
//     var data = await response.json();
//     console.log(data);

// }
// // Calling that async function
// getapi('http://localhost:1100/memories');

// console.log(data)

// document.getElementById('item').innerHTML = data.map( (vlogs) =>
// console.log(vlogs)
//     `
//     <div class="memories-list">
//         <img class="memories-list-image" src="${vlogs.vlog_cover}" alt="bg2" width="350px" height="250px">
//         <h3>${vlogs.vlog_title}</h3>
//         <p>${vlogs.date_from} - ${vlogs.date_to}</p>
//         <div class="del-div">
//             <img class="del-icon" src="../icons/cross.png" alt="del" width="20px" height="20px">
//         </div>
//     </div>
//     <h1>cds</h1>
//     `
// ).join('');

// document.getElementById('memories-body').innerHTML = `
//     <h1>xsd</h1>
// `



const main = document.createElement('div')
main.id="main"
main.className="mainclass"
document.body.appendChild(main)

fetch('http://localhost:1100/memories')
.then((data)=>{
    return data.json()
})

// render only asian countries
.then((data)=>{
    let html=""
    data.map((item)=>{
           html += `
        <div class="item">
            <p>Title : ${item.vlog_title}</p>
            <p>${item.vlog_cover}</p>
            <img src="${item.vlog_cover}"/>
        </div>
            `
        document.getElementById('main').innerHTML=html
    })
})
