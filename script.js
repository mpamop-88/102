(function () {
  "use strict";

  const doc = document;
  const storeKey = "gw_inline_menu_pos";

  const COLORS = {
    bg: "#C4F8D1",
    hover: "#7FF89E",
    border: "1px solid #339933",
  };

  /* ================= LOAD POSITION ================= */
  let pos = JSON.parse(localStorage.getItem(storeKey) || "{}");
  let startX = pos.x || 5;
  let startY = pos.y || 5;

  /* ================= BUTTON ================= */
  const btn = doc.createElement("div");
  btn.textContent = "☰";
  Object.assign(btn.style, {
    position: "fixed",
    left: startX + "px",
    top: startY + "px",
    padding: "4px 4px",
    cursor: "pointer",
    background: COLORS.bg,
    border: COLORS.border,
    fontSize: "10px",
    zIndex: 10000,
    userSelect: "none",
  });
  doc.body.appendChild(btn);

  /* ================= MENU ================= */
  const menu = doc.createElement("div");
  Object.assign(menu.style, {
    position: "fixed",
    display: "none",
    background: COLORS.bg,
    border: COLORS.border,
    fontSize: "10px",
    minWidth: "100px",
    zIndex: 9999,
  });
  doc.body.appendChild(menu);

  /* ================= HELPERS ================= */
  function keepInside(x, y, w, h) {
    const maxX = window.innerWidth - w - 5;
    const maxY = window.innerHeight - h - 5;
    return {
      x: Math.max(5, Math.min(x, maxX)),
      y: Math.max(5, Math.min(y, maxY)),
    };
  }

  function placeSubMenu(sub, anchor) {
    const r = anchor.getBoundingClientRect();
    sub.style.display = "flex";

    const sw = sub.offsetWidth;
    const sh = sub.offsetHeight;

    let x = r.right + 5;
    let y = r.top;

    if (x + sw > window.innerWidth) {
      x = r.left - sw;
    }
    if (y + sh > window.innerHeight) {
      y = window.innerHeight - sh;
    }

    sub.style.left = x + "px";
    sub.style.top = y + "px";
  }

  function closeAllSubMenus() {
    doc.querySelectorAll(".gw-sub").forEach((d) => (d.style.display = "none"));
  }

  /* ================= MENU ITEM ================= */
  function addItem(parent, text, action, submenu) {
    const row = doc.createElement("div");
    Object.assign(row.style, {
      padding: "4px 4px 4px",
      cursor: "pointer",
      display: "flex",
      fontSize: "10px",
      margin: "10px",
      justifyContent: "space-between",
      borderBottom: COLORS.border,
      whiteSpace: "wrap",
    });

    row.onmouseenter = () => (row.style.background = COLORS.hover);
    row.onmouseleave = () => (row.style.background = COLORS.bg);

    const label = doc.createElement("span");
    label.textContent = text;
    row.appendChild(label);

    if (submenu) {
      const arrow = doc.createElement("span");
      arrow.textContent = "»";
      row.appendChild(arrow);

      row.onclick = (e) => {
        e.stopPropagation();
        closeAllSubMenus();
        placeSubMenu(submenu, row);
      };
    } else {
      row.onclick = (e) => {
        e.stopPropagation();
        menu.style.display = "none";
        closeAllSubMenus();
        action && action();
      };
    }

    parent.appendChild(row);
  }

  /* ================= SUBMENU ================= */
  function createSubMenu(items) {
    const div = doc.createElement("div");
    div.className = "gw-sub";
    Object.assign(div.style, {
      position: "fixed",
      display: "none",
      background: COLORS.bg,
      border: COLORS.border,
      minWidth: "100px",
      zIndex: 10001,
    });

    items.forEach((i) => addItem(div, i.text, i.action));
    doc.body.appendChild(div);
    return div;
  }

  /* ================= SUBMENUS ================= */
  const warsMenu = createSubMenu([
    { text: "Журнал боёв", action: () => (location.href = "/warlog.php") },
    { text: "Порт", action: () => (location.href = "/object.php?id=69403") },
    { text: "Замены", action: () => (location.href = "/change.php") },
  ]);

  const infoMenu = createSubMenu([
    { text: "Форум", action: () => (location.href = "/forums.php") },
    { text: "Рейтинг", action: () => (location.href = "/ratings.php") },
  ]);

  /* ================= MAIN MENU ================= */
  addItem(menu, "Бои", null, warsMenu);
  addItem(menu, "Информация", null, infoMenu);
  addItem(menu, "Магазин", () => (location.href = "/shop.php"));
  addItem(menu, "Синдикат", () => (location.href = "/syndicate.php"));
  addItem(menu, "Выход", () => (location.href = "/logoff.php"));

  /* ================= BUTTON TOGGLE ================= */
  btn.onclick = (e) => {
    e.stopPropagation();
    closeAllSubMenus();

    if (menu.style.display === "none") {
      const r = btn.getBoundingClientRect();
      menu.style.left = r.left + "px";
      menu.style.top = r.bottom + 3 + "px";
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  };

  /* ================= CLICK OUTSIDE ================= */
  doc.addEventListener("click", () => {
    menu.style.display = "none";
    closeAllSubMenus();
  });

  menu.onclick = (e) => e.stopPropagation();

  /* ================= DRAG BUTTON ================= */
  let dragging = false,
    dx = 0,
    dy = -1;

  btn.addEventListener("mousedown", (e) => {
    dragging = true;
    dx = e.clientX - btn.offsetLeft;
    dy = e.clientY - btn.offsetTop;
    e.preventDefault();
  });

  doc.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const p = keepInside(
      e.clientX - dx,
      e.clientY - dy,
      btn.offsetWidth,
      btn.offsetHeight,
    );
    btn.style.left = p.x + "px";
    btn.style.top = p.y + "px";
  });

  doc.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    localStorage.setItem(
      storeKey,
      JSON.stringify({
        x: btn.offsetLeft,
        y: btn.offsetTop,
      }),
    );
  });
})();
