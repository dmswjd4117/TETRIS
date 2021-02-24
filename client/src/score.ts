fetch('/score/board/list' , {
    method: 'GET', 
}).then(result=>{
    // 응답을 JSON형태로 파싱한다.
    return result.json()
}).then(result=>{
    const ul = document.querySelector('.score__ul');
    if(ul == null) return;
    ul.innerHTML = ''
    result.forEach((value: { name: any; score: any; }, index:number) => {
        ul.innerHTML += `
        <h3 class="user__ranking"> ${index+1} </h3>
        <li class="user__container">
            <p class="user___name"> ${value.name} </p>
            <p class="user__score"> ${value.score} </p>
        </li>`
    });
}).catch(err=>{
    console.log(err)
})