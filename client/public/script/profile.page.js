
(async function(){
    const postsData = await fetch('http://127.0.0.1:3000/application.com/api/registered-users-data/users', {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });

    const postsJsonData = await postsData.json();
    console.log(postsJsonData)

    const data = decodeURIComponent(document.cookie)
    console.log(data)
}());
 