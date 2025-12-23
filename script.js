(function () {
    'use strict';

    const LS_KEY = 'GW_SCRIPTS_STATE';

    const state = JSON.parse(localStorage.getItem(LS_KEY) || '{}');

    function save() {
        localStorage.setItem(LS_KEY, JSON.stringify(state));
    }

    /* ================= BUTTON ================= */

    const btn = document.createElement('div');
    btn.textContent = '☰';
    Object.assign(btn.style, {
        position: 'fixed',
        top: '10px',
        left: '10px',
        background: '#C4F8D1',
        border: '1px solid #339933',
        padding: '5px 8px',
        cursor: 'pointer',
        zIndex: 9999,
        fontWeight: 'bold'
    });
    document.body.appendChild(btn);

    /* ================= MENU ================= */

    const menu = document.createElement('div');
    Object.assign(menu.style, {
        position: 'fixed',
        top: '40px',
        left: '10px',
        background: '#DBF5E0',
        border: '1px solid #339933',
        padding: '8px',
        display: 'none',
        zIndex: 9999
    });

    menu.innerHTML = `
        <label><input type="checkbox" id="autoout"> АвтоАут</label><br>
        <label><input type="checkbox" id="outtop"> OUT for game-ТОП</label>
    `;

    document.body.appendChild(menu);

    /* ================= MENU LOGIC ================= */

    btn.onclick = () => {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    };

    document.addEventListener('click', e => {
        if (!menu.contains(e.target) && e.target !== btn) {
            menu.style.display = 'none';
        }
    });

    /* ================= CHECKBOXES ================= */

    const autoOut = menu.querySelector('#autoout');
    const outTop = menu.querySelector('#outtop');

    autoOut.checked = !!state.autoOut;
    outTop.checked = !!state.outTop;

    autoOut.onchange = () => {
        state.autoOut = autoOut.checked;
        save();
    };

    outTop.onchange = () => {
        state.outTop = outTop.checked;
        save();
    };

    /* ================= SCRIPTS ================= */

    // ===== АвтоАут =====
    if (state.autoOut && location.pathname.startsWith('/warlog')) {
    window.location.replace("https://www.gwars.io/walk.php");
};
    

    // ===== OUT for game-ТОП =====
    if (state.outTop) {
        // 🔴 ВСТАВЬ СЮДА КОД ВТОРОГО СКРИПТА
        // пример:
        // console.log('OUT for game-ТОП enabled');
    }

})();
