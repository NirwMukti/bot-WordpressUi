const { ipcRenderer } = require("electron");

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('head').style.webkitAppRegion = 'drag'
    const showLogCheckbox = document.querySelector('.peer');
    const boxLog = document.getElementById('fieldLog')
    const logTextarea = document.getElementById('log')
    const progs = document.getElementById('prog')
    const files = document.getElementById('txt');
    const cookies = document.getElementById('json');
    const dom = document.getElementById('domain');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    
    showLogCheckbox.addEventListener('change', function () {
        if (showLogCheckbox.checked) {
            boxLog.classList.remove('hidden')
            logTextarea.scrollTop = logTextarea.scrollHeight
        } else {
            boxLog.classList.add('hidden')
        }
    });

    start.addEventListener('click', () => {
        const data = {
            files : files.files[0]?.path,
            cookies : cookies.files[0]?.path,
            dom : dom.value
        }

        if (files.value == "" && cookies.value == "" && dom.value == "") {
            alert("Cant Null")
        } else {
            ipcRenderer.send('main', data)
        }
    })
    
    ipcRenderer.on('run', () => {
        start.classList.add('hidden')
        stop.classList.remove('hidden')
        dom.disabled = true
        files.disabled = true
        cookies.disabled = true
    })
    
    ipcRenderer.on('force', () => {
        start.classList.remove('hidden')
        stop.classList.add('hidden')
        dom.disabled = false
        files.disabled = false
        cookies.disabled = false
    })

    ipcRenderer.on('log', (event, logs) => {
        logTextarea.value = logs;
        logTextarea.scrollTop = logTextarea.scrollHeight;
    });

    function proggress(prog) {
        progs.style.width = `${prog}%`;
        progs.innerHTML = `${prog}%`;
    }
    
    ipcRenderer.on('proggress', (event, prog) => {
        for (const pros of prog) {
            proggress(pros);
        }
    });
});