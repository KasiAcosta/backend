fetch('/getUserNameEnv')
.then(response => response.json())
.then(data => {
    document.getElementById('userName').innerHTML = `Hasta la proxima ${data.user}`
})

setTimeout(() => {
    location.assign('/');
}, 2000);