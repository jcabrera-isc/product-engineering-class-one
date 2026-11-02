'use strict';

(() => {
  const APP = {
    jobsKey: 'taller-ramiro:coches:v1',
    settingsKey: 'taller-ramiro:ajustes:v1',
    clientApprovalsKey: 'taller-ramiro:aprobaciones-cliente:v1'
  };

  const STATUS_ORDER = ['recibido', 'reparando', 'listo'];

  const STATUS = {
    recibido: {
      label: 'Recibido',
      hint: 'El coche ya está en el taller',
      tone: 'blue'
    },
    reparando: {
      label: 'Reparando',
      hint: 'Manos a la obra',
      tone: 'amber'
    },
    listo: {
      label: 'Listo',
      hint: 'Puede pasar por él',
      tone: 'green'
    }
  };

  const ICON = {
    nut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.5 20.2 7.3v9.4L12 21.5 3.8 16.7V7.3L12 2.5Z"/><circle cx="12" cy="12" r="3.2"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.4-3.4"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
  };

  const ui = { filter: null, search: '' };
  let clientContext = null;
  let toastTimer = null;

  const app = document.getElementById('app');
  const toastEl = document.getElementById('toast');

  const DATE_FMT = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' });
  const DATE_ONLY_FMT = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short' });
  const MONEY_FMT = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[character]));
  }

  function normalize(value) {
    return String(value == null ? '' : value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      toast('No se pudo guardar en este teléfono. Revisa el espacio disponible.', true);
      return false;
    }
  }

  function loadJobs() {
    const jobs = readJSON(APP.jobsKey, []);
    return Array.isArray(jobs) ? jobs : [];
  }

  function saveJobs(jobs) {
    return writeJSON(APP.jobsKey, jobs);
  }

  function loadSettings() {
    const raw = readJSON(APP.settingsKey, {});
    const shopName = typeof raw.shopName === 'string' ? raw.shopName.trim() : '';
    const shopPhone = typeof raw.shopPhone === 'string' ? raw.shopPhone.trim() : '';
    return {
      shopName: shopName || 'Taller de Ramiro',
      shopPhone
    };
  }

  function loadClientApprovals() {
    const approvals = readJSON(APP.clientApprovalsKey, {});
    return approvals && typeof approvals === 'object' && !Array.isArray(approvals) ? approvals : {};
  }

  function saveClientApproval(quoteId, approvedAt) {
    const approvals = loadClientApprovals();
    approvals[quoteId] = approvedAt;
    writeJSON(APP.clientApprovalsKey, approvals);
  }

  function uid(prefix) {
    const random = window.crypto && typeof window.crypto.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
    return prefix + '-' + random;
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function isValidDate(value) {
    return Boolean(value) && !Number.isNaN(new Date(value).getTime());
  }

  function fmtDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '' : DATE_FMT.format(date);
  }

  function timeAgo(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const diff = Date.now() - date.getTime();
    if (diff < 60000) return 'hace un momento';
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return 'hace ' + minutes + ' min';
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return 'hace ' + hours + ' h';
    const days = Math.floor(hours / 24);
    if (days === 1) return 'ayer';
    if (days < 30) return 'hace ' + days + ' días';
    return DATE_ONLY_FMT.format(date);
  }

  function money(value) {
    return MONEY_FMT.format(Number(value) || 0);
  }

  function encodePayload(value) {
    const bytes = new TextEncoder().encode(JSON.stringify(value));
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function decodePayload(value) {
    try {
      let encoded = String(value || '').replace(/-/g, '+').replace(/_/g, '/');
      while (encoded.length % 4) encoded += '=';
      const binary = atob(encoded);
      const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(bytes));
    } catch (error) {
      return null;
    }
  }

  function normalizePhone(phone) {
    let digits = String(phone || '').replace(/\D/g, '');
    if (!digits) return '';
    if (digits.length === 10) digits = '52' + digits;
    return digits;
  }

  function waHref(phone, message) {
    const normalized = normalizePhone(phone);
    const text = encodeURIComponent(message);
    return normalized ? 'https://wa.me/' + normalized + '?text=' + text : 'https://wa.me/?text=' + text;
  }

  function telHref(phone) {
    return 'tel:' + String(phone || '').replace(/[^\d+]/g, '');
  }

  function openWhatsApp(phone, message) {
    const link = document.createElement('a');
    link.href = waHref(phone, message);
    link.target = '_blank';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function fallbackCopy(text) {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-1000px';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }

  async function copyText(text, message) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
      toast(message || 'Link copiado');
    } catch (error) {
      try {
        fallbackCopy(text);
        toast(message || 'Link copiado');
      } catch (fallbackError) {
        toast('No se pudo copiar. Mantén presionado el link para copiarlo.', true);
      }
    }
  }

  function toast(message, isError) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.toggle('is-error', Boolean(isError));
    toastEl.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, 3400);
  }

  function showFormError(id, message) {
    const element = document.getElementById(id);
    if (!element) return;
    element.textContent = message;
    element.hidden = false;
  }

  function hideFormError(id) {
    const element = document.getElementById(id);
    if (element) element.hidden = true;
  }

  function go(hash) {
    if (location.hash === hash) {
      render();
    } else {
      location.hash = hash;
    }
  }

  function parseRoute() {
    const raw = location.hash.replace(/^#\/?/, '');
    const parts = raw.split('/').filter(Boolean);
    return { name: parts[0] || 'inicio', arg: parts[1] || '' };
  }

  function searchText(job) {
    return [job.plate, job.clientName, job.fault, job.phone].join(' ');
  }

  function statusChip(status) {
    const meta = STATUS[status] || STATUS.recibido;
    return '<span class="status-chip status-' + meta.tone + '"><span class="dot" aria-hidden="true"></span>' + meta.label + '</span>';
  }

  function filterChip(status, count) {
    const meta = STATUS[status];
    const active = ui.filter === status;
    return '<button type="button" class="stat tone-' + meta.tone + (active ? ' is-active' : '') + '" data-action="filter" data-status="' + status + '" aria-pressed="' + active + '">' +
      '<span class="stat-count">' + count + '</span>' +
      '<span class="stat-label">' + meta.label + '</span>' +
    '</button>';
  }

  function jobCard(job, hidden) {
    const status = STATUS[job.status] ? job.status : 'recibido';
    return '<a class="job-card" href="#/coche/' + encodeURIComponent(job.id) + '" data-search="' + esc(normalize(searchText(job))) + '" data-status="' + status + '"' + (hidden ? ' hidden' : '') + '>' +
      '<div class="job-top">' +
        '<span class="plate">' + esc(job.plate) + '</span>' +
        statusChip(status) +
      '</div>' +
      '<div class="job-client">' + esc(job.clientName) + '</div>' +
      '<p class="job-fault">' + esc(job.fault) + '</p>' +
      '<div class="job-foot">' +
        '<span class="muted">' + esc(timeAgo(job.updatedAt || job.createdAt)) + '</span>' +
        '<span class="job-open">Abrir ' + ICON.arrowRight + '</span>' +
      '</div>' +
    '</a>';
  }

  function shopShell(settings, content, hasBottomBar) {
    return '<header class="topbar">' +
      '<div class="topbar-inner">' +
        '<a class="brand" href="#/" aria-label="' + esc(settings.shopName) + ' — inicio">' +
          '<span class="brand-mark" aria-hidden="true">' + ICON.nut + '</span>' +
          '<span class="brand-text">' +
            '<span class="brand-kicker">Taller mecánico</span>' +
            '<span class="brand-name">' + esc(settings.shopName) + '</span>' +
          '</span>' +
        '</a>' +
        '<a class="icon-btn" href="#/ajustes" aria-label="Ajustes del taller">' + ICON.gear + '</a>' +
      '</div>' +
    '</header>' +
    '<main id="contenido" class="main' + (hasBottomBar ? ' has-bottom-bar' : '') + '">' + content + '</main>';
  }

  function homeView(jobs) {
    const counts = { recibido: 0, reparando: 0, listo: 0 };
    jobs.forEach((job) => {
      if (Object.prototype.hasOwnProperty.call(counts, job.status)) counts[job.status] += 1;
    });

    const sorted = jobs.slice().sort((a, b) => {
      return new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0);
    });

    const query = normalize(ui.search.trim());
    const baseList = ui.filter ? sorted.filter((job) => job.status === ui.filter) : sorted;
    const matches = (job) => !query || normalize(searchText(job)).includes(query);
    const visibleCount = baseList.filter(matches).length;
    const countLabel = visibleCount === 1 ? '1 coche' : visibleCount + ' coches';
    const showList = baseList.length > 0;

    return '<div class="screen">' +
      '<div class="screen-intro">' +
        '<p class="eyebrow">Panel del taller</p>' +
        '<h1>¿Qué coche sigue?</h1>' +
        '<p class="lede">Da de alta un coche en menos de 30 segundos y comparte su estado por WhatsApp.</p>' +
      '</div>' +
      '<div class="stats" role="group" aria-label="Filtrar coches por estado">' +
        filterChip('recibido', counts.recibido) +
        filterChip('reparando', counts.reparando) +
        filterChip('listo', counts.listo) +
      '</div>' +
      '<div class="search">' +
        ICON.search +
        '<label class="sr-only" for="buscar">Buscar por placa, cliente o falla</label>' +
        '<input id="buscar" type="search" placeholder="Buscar placa, cliente o falla" autocomplete="off" value="' + esc(ui.search) + '">' +
      '</div>' +
      '<div class="list-head">' +
        '<h2 id="list-count">' + countLabel + '</h2>' +
        (ui.filter ? '<button class="link-btn" type="button" data-action="clear-filter">Ver todos</button>' : '') +
      '</div>' +
      (showList ? '<div class="job-list" id="job-list">' + baseList.map((job) => jobCard(job, !matches(job))).join('') + '</div>' : '') +
      (showList ? '' : emptyState(jobs.length)) +
      (showList ? '<div id="search-empty" class="empty small"' + (visibleCount === 0 ? '' : ' hidden') + '>' + ICON.search +
        '<div><strong>Sin resultados</strong>Prueba con otra placa, cliente o falla.<br><button class="link-btn" type="button" data-action="clear-search">Limpiar búsqueda</button></div>' +
      '</div>' : '') +
    '</div>' +
    '<div class="bottom-bar">' +
      '<a class="btn btn-primary btn-block btn-xl" href="#/nuevo">' + ICON.plus + ' Dar de alta un coche</a>' +
    '</div>';
  }

  function emptyState(total) {
    if (total === 0) {
      return '<div class="empty">' + ICON.wrench +
        '<div><strong>Aún no hay coches</strong>Da de alta el primero con el botón de abajo.</div>' +
      '</div>';
    }
    return '<div class="empty small">' + ICON.search +
      '<div><strong>No hay coches con ese filtro</strong>Puedes ver todos los coches del taller.<br><button class="link-btn" type="button" data-action="clear-filter">Ver todos</button></div>' +
    '</div>';
  }

  function applySearchFilter() {
    const input = document.getElementById('buscar');
    const list = document.getElementById('job-list');
    if (!input || !list) return;
    const query = normalize(input.value.trim());
    let visible = 0;
    Array.from(list.querySelectorAll('.job-card')).forEach((card) => {
      const match = !query || (card.dataset.search || '').includes(query);
      card.hidden = !match;
      if (match) visible += 1;
    });
    const count = document.getElementById('list-count');
    if (count) count.textContent = visible === 1 ? '1 coche' : visible + ' coches';
    const empty = document.getElementById('search-empty');
    if (empty) empty.hidden = visible !== 0;
  }

  function newJobView() {
    return '<div class="screen narrow">' +
      '<a class="back" href="#/">' + ICON.arrowLeft + ' Volver al taller</a>' +
      '<div class="screen-intro">' +
        '<p class="eyebrow">Alta rápida</p>' +
        '<h1>Nuevo coche</h1>' +
        '<p class="lede">Con estos cuatro datos queda registrado como <strong>Recibido</strong>.</p>' +
      '</div>' +
      '<form id="form-nuevo" class="form" novalidate>' +
        '<div class="field">' +
          '<label for="cliente">Nombre del cliente</label>' +
          '<input id="cliente" name="cliente" autocomplete="name" maxlength="80" placeholder="Ej. Juan Pérez" required autofocus>' +
        '</div>' +
        '<div class="field">' +
          '<label for="telefono">Teléfono</label>' +
          '<input id="telefono" name="telefono" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" placeholder="Ej. 771 123 4567" required>' +
        '</div>' +
        '<div class="field">' +
          '<label for="placa">Placa</label>' +
          '<input id="placa" name="placa" class="plate-input" maxlength="15" autocapitalize="characters" spellcheck="false" placeholder="Ej. ABC-123-A" required>' +
        '</div>' +
        '<div class="field">' +
          '<label for="falla">Falla que reporta</label>' +
          '<textarea id="falla" name="falla" rows="3" maxlength="400" placeholder="Ej. Hace un ruido al frenar" required></textarea>' +
        '</div>' +
        '<p class="form-error" id="form-error" role="alert" hidden></p>' +
        '<button class="btn btn-primary btn-block btn-xl" type="submit">Guardar coche</button>' +
        '<a class="btn btn-ghost btn-block" href="#/">Cancelar</a>' +
      '</form>' +
    '</div>';
  }

  function statusButton(job, status) {
    const meta = STATUS[status];
    const active = job.status === status;
    return '<button type="button" class="status-option tone-' + meta.tone + (active ? ' is-active' : '') + '" data-action="change-status" data-id="' + esc(job.id) + '" data-status="' + status + '" aria-pressed="' + active + '">' +
      '<span class="status-option-label">' + meta.label + '</span>' +
      '<span class="status-option-hint">' + meta.hint + '</span>' +
    '</button>';
  }

  function timeline(job) {
    let history = Array.isArray(job.history) ? job.history.filter((entry) => STATUS[entry.status]) : [];
    if (!history.length) history = [{ status: job.status, at: job.updatedAt || job.createdAt }];
    return '<ol class="timeline">' + history.map((entry, index) => {
      const meta = STATUS[entry.status];
      const current = index === history.length - 1;
      return '<li>' +
        '<span class="dot tone-' + meta.tone + '" aria-hidden="true"></span>' +
        '<div><strong>' + meta.label + (current ? ' · actual' : '') + '</strong>' +
        '<span class="muted small">' + esc(fmtDate(entry.at)) + '</span></div>' +
      '</li>';
    }).join('') + '</ol>';
  }

  function quoteRow(job, quote) {
    const approved = quote.status === 'aprobada';
    return '<div class="quote-card' + (approved ? ' is-approved' : '') + '">' +
      '<div class="quote-top">' +
        '<div>' +
          '<p class="quote-concept">' + esc(quote.description) + '</p>' +
          '<p class="muted small">Creada el ' + esc(fmtDate(quote.createdAt)) + '</p>' +
        '</div>' +
        '<span class="quote-amount">' + esc(money(quote.amount)) + '</span>' +
      '</div>' +
      (approved
        ? '<p class="quote-approved">Aprobada el ' + esc(fmtDate(quote.approvedAt)) + '</p>'
        : '<div class="quote-actions">' +
            '<button class="btn btn-small btn-primary" type="button" data-action="share-quote" data-id="' + esc(job.id) + '">Enviar al cliente</button>' +
            '<button class="btn btn-small btn-soft" type="button" data-action="approve-manual" data-id="' + esc(job.id) + '" data-quote="' + esc(quote.id) + '">Marcar aprobada</button>' +
          '</div>') +
      '<button class="link-btn subtle" type="button" data-action="delete-quote" data-id="' + esc(job.id) + '" data-quote="' + esc(quote.id) + '">Eliminar cotización</button>' +
    '</div>';
  }

  function jobDetailView(job) {
    const status = STATUS[job.status] ? job.status : 'recibido';
    const quotes = Array.isArray(job.quotes) ? job.quotes : [];
    const hasPhone = Boolean(String(job.phone || '').replace(/\D/g, ''));

    return '<div class="screen detail">' +
      '<a class="back" href="#/">' + ICON.arrowLeft + ' Volver al taller</a>' +
      '<div class="detail-hero">' +
        '<div class="detail-hero-head">' +
          '<p class="eyebrow">Orden de trabajo</p>' +
          statusChip(status) +
        '</div>' +
        '<h1 class="plate-xl">' + esc(job.plate) + '</h1>' +
        '<p class="detail-client">' + esc(job.clientName) + '</p>' +
      '</div>' +
      (hasPhone
        ? '<div class="quick-actions">' +
            '<a class="btn btn-soft" href="' + esc(telHref(job.phone)) + '">' + ICON.phone + ' Llamar</a>' +
            '<a class="btn btn-soft" href="' + esc(waHref(job.phone, 'Hola ' + job.clientName + ', te escribimos del taller por tu coche ' + job.plate + '.')) + '" target="_blank" rel="noopener">' + ICON.chat + ' WhatsApp</a>' +
          '</div>'
        : '') +
      '<section class="card">' +
        '<h2 class="card-title">Falla reportada</h2>' +
        '<p class="fault-text">' + esc(job.fault) + '</p>' +
        '<p class="muted small">Alta: ' + esc(fmtDate(job.createdAt)) + ' · Teléfono: ' + esc(job.phone || 'sin teléfono') + '</p>' +
      '</section>' +
      '<section class="card">' +
        '<h2 class="card-title">Estado del coche</h2>' +
        '<p class="muted small">Toca un estado para actualizarlo. El cliente lo verá al compartir el link.</p>' +
        '<div class="status-switch" role="group" aria-label="Cambiar estado del coche">' +
          STATUS_ORDER.map((item) => statusButton(job, item)).join('') +
        '</div>' +
        '<div class="share-row">' +
          '<button class="btn btn-primary" type="button" data-action="share-status" data-id="' + esc(job.id) + '">Compartir estado por WhatsApp</button>' +
          '<button class="btn btn-soft" type="button" data-action="copy-status" data-id="' + esc(job.id) + '">Copiar link</button>' +
        '</div>' +
        '<p class="hint">El link abre el estado y las cotizaciones. No requiere registro ni instalar nada.</p>' +
      '</section>' +
      '<section class="card">' +
        '<div class="card-head">' +
          '<h2 class="card-title">Cotizaciones extra</h2>' +
          '<button class="btn btn-small btn-soft" type="button" data-action="toggle-quote-form">Agregar</button>' +
        '</div>' +
        '<div id="quote-form-wrap" hidden>' +
          '<form id="form-cotizacion" class="form compact" novalidate>' +
            '<input type="hidden" name="jobId" value="' + esc(job.id) + '">' +
            '<div class="field">' +
              '<label for="concepto">Reparación extra</label>' +
              '<input id="concepto" name="concepto" maxlength="120" placeholder="Ej. Cambio de balatas" required>' +
            '</div>' +
            '<div class="field">' +
              '<label for="monto">Monto</label>' +
              '<input id="monto" name="monto" type="number" inputmode="decimal" min="1" step="0.01" placeholder="Ej. 850" required>' +
            '</div>' +
            '<p class="form-error" id="quote-error" role="alert" hidden></p>' +
            '<button class="btn btn-primary btn-block" type="submit">Guardar cotización</button>' +
          '</form>' +
        '</div>' +
        (quotes.length
          ? '<div class="quote-list">' + quotes.map((quote) => quoteRow(job, quote)).join('') + '</div>'
          : '<p class="empty-inline">Todavía no hay reparaciones extra.</p>') +
        '<p class="hint">Si agregas una cotización, vuelve a enviar el link para que el cliente pueda aprobarla.</p>' +
      '</section>' +
      '<section class="card">' +
        '<h2 class="card-title">Historial</h2>' +
        timeline(job) +
      '</section>' +
      '<div class="danger-zone">' +
        '<button class="link-btn danger" type="button" data-action="delete-job" data-id="' + esc(job.id) + '">Eliminar este coche</button>' +
      '</div>' +
    '</div>';
  }

  function missingJobView() {
    return '<div class="screen narrow">' +
      '<a class="back" href="#/">' + ICON.arrowLeft + ' Volver al taller</a>' +
      '<div class="empty">' + ICON.wrench +
        '<div><strong>No encontramos ese coche</strong>Puede que se haya eliminado o que el link esté incompleto.</div>' +
      '</div>' +
      '<a class="btn btn-primary btn-block" href="#/">Ir al taller</a>' +
    '</div>';
  }

  function settingsView(settings, jobs) {
    return '<div class="screen narrow">' +
      '<a class="back" href="#/">' + ICON.arrowLeft + ' Volver al taller</a>' +
      '<div class="screen-intro">' +
        '<p class="eyebrow">Configuración</p>' +
        '<h1>Ajustes</h1>' +
      '</div>' +
      '<form id="form-ajustes" class="card form" novalidate>' +
        '<div class="field">' +
          '<label for="shopName">Nombre del taller</label>' +
          '<input id="shopName" name="shopName" maxlength="60" value="' + esc(settings.shopName) + '" required>' +
        '</div>' +
        '<div class="field">' +
          '<label for="shopPhone">WhatsApp del taller</label>' +
          '<input id="shopPhone" name="shopPhone" type="tel" inputmode="tel" maxlength="20" value="' + esc(settings.shopPhone) + '" placeholder="Ej. 771 123 4567">' +
          '<p class="hint">Se usa para que el cliente te avise cuando apruebe una cotización. Si no es de 10 dígitos, incluye la lada del país.</p>' +
        '</div>' +
        '<button class="btn btn-primary btn-block" type="submit">Guardar ajustes</button>' +
      '</form>' +
      '<section class="card">' +
        '<h2 class="card-title">Respaldo</h2>' +
        '<p class="muted small">Los datos viven en este teléfono o navegador. Descarga un respaldo de vez en cuando.</p>' +
        '<div class="stack">' +
          '<button class="btn btn-soft" type="button" data-action="export">Descargar respaldo</button>' +
          '<label class="btn btn-soft file-btn">Importar respaldo<input type="file" accept="application/json,.json" id="import-file" hidden></label>' +
        '</div>' +
        '<p class="muted small">' + (jobs.length === 1 ? '1 coche guardado.' : jobs.length + ' coches guardados.') + '</p>' +
      '</section>' +
      '<p class="hint">Los links de cliente se generan con la información del momento. Si cambia el estado o agregas una cotización, vuelve a enviar el link actualizado.</p>' +
    '</div>';
  }

  function clientUrl(job) {
    const settings = loadSettings();
    const payload = {
      v: 1,
      shop: { name: settings.shopName, phone: settings.shopPhone },
      job: {
        id: job.id,
        plate: job.plate,
        clientName: job.clientName,
        status: job.status,
        fault: job.fault,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
        history: Array.isArray(job.history) ? job.history.map((entry) => ({ status: entry.status, at: entry.at })) : [],
        quotes: Array.isArray(job.quotes) ? job.quotes.map((quote) => ({
          id: quote.id,
          description: quote.description,
          amount: quote.amount,
          createdAt: quote.createdAt,
          status: quote.status,
          approvedAt: quote.approvedAt || null
        })) : []
      }
    };
    return location.origin + location.pathname + location.search + '#/cliente/' + encodePayload(payload);
  }

  function confirmationUrl(job, quote, approvedAt, shop) {
    const payload = {
      v: 1,
      jobId: job.id,
      quoteId: quote.id,
      plate: job.plate,
      clientName: job.clientName,
      description: quote.description,
      amount: quote.amount,
      approvedAt,
      shopName: shop && shop.name ? shop.name : '',
      shopPhone: shop && shop.phone ? shop.phone : ''
    };
    return location.origin + location.pathname + location.search + '#/confirmar/' + encodePayload(payload);
  }

  function buildStatusMessage(job, url) {
    const phrase = job.status === 'recibido'
      ? 'recibido en el taller'
      : job.status === 'reparando'
        ? 'en reparación'
        : job.status === 'listo'
          ? 'listo para recoger'
          : 'registrado';
    return 'Hola ' + job.clientName + ', tu coche con placa ' + job.plate + ' está ' + phrase + '. ' +
      'Puedes ver el detalle y aprobar cotizaciones aquí, sin registrarte ni instalar nada: ' + url;
  }

  function buildQuoteMessage(job, url) {
    return 'Hola ' + job.clientName + ', hay una reparación extra para tu coche ' + job.plate + '. ' +
      'Puedes revisarla y aprobarla con un toque aquí: ' + url;
  }

  function buildApprovalMessage(job, quote, approvedAt, shop, url) {
    const shopName = shop && shop.name ? ' ' + shop.name : '';
    return 'Hola' + shopName + ', aprobé la cotización "' + quote.description + '" por ' + money(quote.amount) +
      ' del coche ' + job.plate + '. Fecha y hora: ' + fmtDate(approvedAt) + '. Confirmación: ' + url;
  }

  function statusMessageClient(status) {
    if (status === 'recibido') return 'Recibimos tu coche. Te avisaremos cuando empecemos a repararlo.';
    if (status === 'reparando') return 'Ya estamos trabajando en tu coche. Aquí verás el avance.';
    if (status === 'listo') return 'Tu coche está listo. Puedes pasar por él cuando quieras.';
    return '';
  }

  function clientSteps(job) {
    const currentIndex = Math.max(0, STATUS_ORDER.indexOf(job.status));
    const history = Array.isArray(job.history) ? job.history : [];
    const dates = {};
    history.forEach((entry) => {
      if (entry && entry.status && !dates[entry.status]) dates[entry.status] = entry.at;
    });

    return '<ol class="steps">' + STATUS_ORDER.map((status, index) => {
      const meta = STATUS[status];
      const done = index <= currentIndex;
      const current = index === currentIndex;
      const at = dates[status] || (status === job.status ? (job.updatedAt || job.createdAt) : null);
      return '<li class="step' + (done ? ' is-done' : '') + (current ? ' is-current' : '') + '">' +
        '<span class="step-dot" aria-hidden="true">' + (done ? ICON.check : '') + '</span>' +
        '<div class="step-text"><strong>' + meta.label + '</strong>' +
        '<span class="muted small">' + (at ? esc(fmtDate(at)) : (done ? 'Completado' : 'Pendiente')) + '</span></div>' +
      '</li>';
    }).join('') + '</ol>';
  }

  function clientQuoteCard(job, quote, shop, approved) {
    const approvedAt = quote.approvedAt || job.updatedAt || job.createdAt;
    const confirmUrl = approved ? confirmationUrl(job, quote, approvedAt, shop) : '';
    const message = approved ? buildApprovalMessage(job, quote, approvedAt, shop, confirmUrl) : '';

    return '<section class="client-quote' + (approved ? ' is-approved' : '') + '" id="cot-' + esc(quote.id) + '">' +
      '<div class="client-quote-head">' +
        '<div>' +
          '<p class="client-quote-label">' + (approved ? 'Cotización aprobada' : 'Cotización pendiente') + '</p>' +
          '<p class="client-quote-concept">' + esc(quote.description) + '</p>' +
        '</div>' +
        '<p class="client-quote-amount">' + esc(money(quote.amount)) + '</p>' +
      '</div>' +
      (approved
        ? '<p class="quote-approved">Aprobada el ' + esc(fmtDate(approvedAt)) + '</p>' +
          '<div class="quote-actions">' +
            '<a class="btn btn-small btn-primary" href="' + esc(waHref(shop.phone, message)) + '" target="_blank" rel="noopener">Avisar al taller</a>' +
            '<button class="btn btn-small btn-soft" type="button" data-action="copy-confirm" data-quote="' + esc(quote.id) + '">Copiar confirmación</button>' +
          '</div>' +
          '<p class="hint">' + (quote.approvedHere ? 'Tu aprobación quedó guardada en este teléfono. ' : '') +
            'Envía el aviso para que el taller la registre.</p>'
        : '<button class="btn btn-primary btn-block btn-xl" type="button" data-action="client-approve" data-quote="' + esc(quote.id) + '">Aprobar esta cotización</button>' +
          '<p class="hint">Al aprobar se guarda la fecha y hora. No necesitas crear una cuenta.</p>') +
    '</section>';
  }

  function clientQuotesView(job, shop) {
    const quotes = Array.isArray(job.quotes) ? job.quotes : [];
    if (!quotes.length) {
      return '<section class="card">' +
        '<h2 class="card-title">Reparaciones extra</h2>' +
        '<p class="empty-inline">Por ahora no hay reparaciones extra. Si aparece algo, aquí podrás aprobarlo.</p>' +
      '</section>';
    }
    const pending = quotes.filter((quote) => quote.status !== 'aprobada');
    const approved = quotes.filter((quote) => quote.status === 'aprobada');
    return '<section class="card">' +
        '<h2 class="card-title">Reparaciones extra</h2>' +
        '<p class="muted small">' + (pending.length
          ? 'Revisa la cotización y apruébala con un toque.'
          : 'No hay cotizaciones pendientes.') + '</p>' +
      '</section>' +
      pending.map((quote) => clientQuoteCard(job, quote, shop, false)).join('') +
      approved.map((quote) => clientQuoteCard(job, quote, shop, true)).join('');
  }

  function clientHeader(shop, kicker) {
    return '<header class="topbar">' +
      '<div class="topbar-inner">' +
        '<div class="brand">' +
          '<span class="brand-mark" aria-hidden="true">' + ICON.nut + '</span>' +
          '<span class="brand-text">' +
            '<span class="brand-kicker">' + kicker + '</span>' +
            '<span class="brand-name">' + esc((shop && shop.name) || 'Taller mecánico') + '</span>' +
          '</span>' +
        '</div>' +
      '</div>' +
    '</header>';
  }

  function clientErrorView(title, message) {
    app.innerHTML = clientHeader({ name: 'Taller mecánico' }, 'Portal del cliente') +
      '<main id="contenido" class="main client-main">' +
        '<div class="screen narrow">' +
          '<div class="empty">' + ICON.wrench +
            '<div><strong>' + esc(title) + '</strong>' + esc(message) + '</div>' +
          '</div>' +
          '<a class="btn btn-primary btn-block" href="#/">Ir al taller</a>' +
        '</div>' +
      '</main>';
  }

  function renderClient(raw) {
    const data = decodePayload(raw);
    if (!data || !data.job || !data.job.plate) {
      document.title = 'Link no válido · Taller';
      clientErrorView('Este link no es válido o está incompleto', 'Pide al taller que te lo envíe de nuevo por WhatsApp.');
      return;
    }

    const shop = data.shop && typeof data.shop === 'object' ? data.shop : {};
    const job = data.job;
    job.quotes = Array.isArray(job.quotes) ? job.quotes : [];
    job.history = Array.isArray(job.history) ? job.history : [];

    const localApprovals = loadClientApprovals();
    job.quotes = job.quotes.map((quote) => {
      if (quote.status !== 'aprobada' && localApprovals[quote.id]) {
        return Object.assign({}, quote, {
          status: 'aprobada',
          approvedAt: localApprovals[quote.id],
          approvedHere: true
        });
      }
      return quote;
    });

    clientContext = { data, job, shop };
    const status = STATUS[job.status] ? job.status : 'recibido';
    document.title = 'Tu coche ' + job.plate + ' · ' + (shop.name || 'Taller');

    app.innerHTML = clientHeader(shop, 'Portal del cliente') +
      '<main id="contenido" class="main client-main">' +
        '<section class="client-hero">' +
          '<p class="eyebrow">Estado de tu coche</p>' +
          '<h1 class="plate-xl">' + esc(job.plate) + '</h1>' +
          '<p class="client-name">' + esc(job.clientName || '') + '</p>' +
          statusChip(status) +
          '<p class="status-message">' + statusMessageClient(status) + '</p>' +
        '</section>' +
        '<section class="card">' +
          '<h2 class="card-title">Avance de la reparación</h2>' +
          clientSteps(job) +
        '</section>' +
        '<section class="card">' +
          '<h2 class="card-title">Falla reportada</h2>' +
          '<p class="fault-text">' + esc(job.fault || 'Sin detalle.') + '</p>' +
        '</section>' +
        clientQuotesView(job, shop) +
        '<p class="client-foot">Actualizado: ' + esc(fmtDate(job.updatedAt || job.createdAt)) +
          '<br>Este link es personal y no necesita registro ni instalar nada.</p>' +
      '</main>';
  }

  function approvalResultView(result) {
    const data = result.data || {};
    const applied = result.status === 'applied';
    const already = result.status === 'already';
    const failed = result.status === 'error';
    const title = applied
      ? 'Aprobación registrada'
      : already
        ? 'Aprobación ya registrada'
        : failed
          ? 'No se pudo guardar la aprobación'
          : 'No encontramos esta orden';
    const message = applied
      ? 'La cotización quedó aprobada en este teléfono con fecha y hora.'
      : already
        ? 'Esta cotización ya estaba marcada como aprobada.'
        : failed
          ? 'Intenta abrir el link otra vez o marca la cotización como aprobada desde el taller.'
          : 'Este link debe abrirse en el teléfono donde se usa la app del taller para registrar la aprobación.';
    const approvedAt = result.at || data.approvedAt || nowISO();

    const actions = applied || already || failed
      ? '<a class="btn btn-primary btn-block" href="#/coche/' + encodeURIComponent(data.jobId) + '">Abrir orden del coche</a>' +
        '<a class="btn btn-ghost btn-block" href="#/">Ir al taller</a>'
      : '<a class="btn btn-primary btn-block" href="#/">Ir al taller</a>';

    app.innerHTML = clientHeader({ name: data.shopName || 'Taller mecánico' }, 'Confirmación') +
      '<main id="contenido" class="main client-main">' +
        '<section class="confirm-hero">' +
          '<span class="confirm-icon" aria-hidden="true">' + (applied || already ? ICON.check : ICON.wrench) + '</span>' +
          '<p class="eyebrow">Confirmación de aprobación</p>' +
          '<h1>' + title + '</h1>' +
          '<p class="muted">' + message + '</p>' +
        '</section>' +
        '<section class="card">' +
          '<div class="confirm-data">' +
            '<div class="confirm-line"><span>Coche</span><strong>' + esc(data.plate || '—') + '</strong></div>' +
            '<div class="confirm-line"><span>Cliente</span><strong>' + esc(data.clientName || '—') + '</strong></div>' +
            '<div class="confirm-line"><span>Reparación</span><strong>' + esc(data.description || '—') + '</strong></div>' +
            '<div class="confirm-line"><span>Monto</span><strong>' + esc(money(data.amount)) + '</strong></div>' +
            '<div class="confirm-line"><span>Fecha y hora</span><strong>' + esc(fmtDate(approvedAt)) + '</strong></div>' +
          '</div>' +
        '</section>' +
        actions +
      '</main>';
  }

  function renderConfirmation(raw) {
    const data = decodePayload(raw);
    document.title = 'Confirmación de aprobación · Taller';
    if (!data || !data.jobId || !data.quoteId) {
      clientErrorView('Esta confirmación no es válida', 'Pide al cliente que vuelva a aprobar la cotización y te comparta el aviso.');
      return;
    }

    const jobs = loadJobs();
    const job = jobs.find((item) => item.id === String(data.jobId));
    if (!job) {
      approvalResultView({ status: 'missing', data });
      return;
    }

    const quote = (Array.isArray(job.quotes) ? job.quotes : []).find((item) => item.id === String(data.quoteId));
    if (!quote) {
      approvalResultView({ status: 'missing', data });
      return;
    }

    if (quote.status === 'aprobada') {
      approvalResultView({ status: 'already', job, quote, data, at: quote.approvedAt });
      return;
    }

    const approvedAt = isValidDate(data.approvedAt) ? data.approvedAt : nowISO();
    quote.status = 'aprobada';
    quote.approvedAt = approvedAt;
    job.updatedAt = nowISO();

    if (!saveJobs(jobs)) {
      approvalResultView({ status: 'error', job, quote, data, at: approvedAt });
      return;
    }

    approvalResultView({ status: 'applied', job, quote, data, at: approvedAt });
  }

  function safeId(value, prefix) {
    const clean = String(value || '').replace(/[^A-Za-z0-9_-]/g, '');
    return clean || uid(prefix);
  }

  function normalizeQuote(quote) {
    return {
      id: safeId(quote.id, 'cot'),
      description: String(quote.description || 'Reparación extra'),
      amount: Number(quote.amount) || 0,
      createdAt: isValidDate(quote.createdAt) ? quote.createdAt : nowISO(),
      status: quote.status === 'aprobada' ? 'aprobada' : 'pendiente',
      approvedAt: isValidDate(quote.approvedAt) ? quote.approvedAt : null
    };
  }

  function normalizeJob(job) {
    const status = STATUS[job.status] ? job.status : 'recibido';
    const createdAt = isValidDate(job.createdAt) ? job.createdAt : nowISO();
    const updatedAt = isValidDate(job.updatedAt) ? job.updatedAt : createdAt;
    let history = Array.isArray(job.history)
      ? job.history.filter((entry) => entry && STATUS[entry.status]).map((entry) => ({
          status: entry.status,
          at: isValidDate(entry.at) ? entry.at : updatedAt
        }))
      : [];
    if (!history.length) history = [{ status, at: createdAt }];

    return {
      id: safeId(job.id, 'coche'),
      clientName: String(job.clientName || 'Cliente'),
      phone: String(job.phone || ''),
      plate: String(job.plate || '').toUpperCase(),
      fault: String(job.fault || ''),
      status,
      createdAt,
      updatedAt,
      history,
      quotes: Array.isArray(job.quotes) ? job.quotes.map(normalizeQuote) : []
    };
  }

  function exportBackup() {
    const data = {
      version: 1,
      exportedAt: nowISO(),
      settings: loadSettings(),
      jobs: loadJobs()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'respaldo-taller-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Respaldo descargado');
  }

  function handleNewJob(form) {
    hideFormError('form-error');
    const name = form.elements.cliente.value.trim();
    const phone = form.elements.telefono.value.trim();
    const plate = form.elements.placa.value.trim().toUpperCase();
    const fault = form.elements.falla.value.trim();

    if (!name || !phone || !plate || !fault) {
      showFormError('form-error', 'Completa el nombre, teléfono, placa y falla para guardar el coche.');
      return;
    }

    const at = nowISO();
    const job = {
      id: uid('coche'),
      clientName: name,
      phone,
      plate,
      fault,
      status: 'recibido',
      createdAt: at,
      updatedAt: at,
      history: [{ status: 'recibido', at }],
      quotes: []
    };

    const jobs = loadJobs();
    jobs.push(job);
    if (!saveJobs(jobs)) return;

    ui.filter = null;
    ui.search = '';
    toast('Coche dado de alta');
    go('#/coche/' + encodeURIComponent(job.id));
  }

  function handleNewQuote(form) {
    hideFormError('quote-error');
    const jobId = form.elements.jobId.value;
    const description = form.elements.concepto.value.trim();
    const amount = Number(form.elements.monto.value);

    if (!description || !Number.isFinite(amount) || amount <= 0) {
      showFormError('quote-error', 'Escribe la reparación y un monto mayor a cero.');
      return;
    }

    const jobs = loadJobs();
    const job = jobs.find((item) => item.id === jobId);
    if (!job) {
      toast('No encontramos ese coche', true);
      return;
    }

    const at = nowISO();
    job.quotes = Array.isArray(job.quotes) ? job.quotes : [];
    job.quotes.push({
      id: uid('cot'),
      description,
      amount: Math.round(amount * 100) / 100,
      createdAt: at,
      status: 'pendiente',
      approvedAt: null
    });
    job.updatedAt = at;

    if (!saveJobs(jobs)) return;
    render({ keepScroll: true });
    toast('Cotización creada. Envía el link al cliente.');
  }

  function handleSettings(form) {
    const shopName = form.elements.shopName.value.trim();
    const shopPhone = form.elements.shopPhone.value.trim();
    if (!shopName) {
      toast('Escribe el nombre del taller', true);
      return;
    }
    if (!writeJSON(APP.settingsKey, { shopName, shopPhone })) return;
    render();
    toast('Ajustes guardados');
  }

  function shareStatus(jobId) {
    const job = loadJobs().find((item) => item.id === jobId);
    if (!job) {
      toast('No encontramos ese coche', true);
      return;
    }
    openWhatsApp(job.phone, buildStatusMessage(job, clientUrl(job)));
  }

  function shareQuote(jobId) {
    const job = loadJobs().find((item) => item.id === jobId);
    if (!job) {
      toast('No encontramos ese coche', true);
      return;
    }
    openWhatsApp(job.phone, buildQuoteMessage(job, clientUrl(job)));
  }

  function copyClientLink(jobId) {
    const job = loadJobs().find((item) => item.id === jobId);
    if (!job) {
      toast('No encontramos ese coche', true);
      return;
    }
    copyText(clientUrl(job), 'Link del cliente copiado');
  }

  function changeStatus(jobId, status) {
    if (!STATUS[status]) return;
    const jobs = loadJobs();
    const job = jobs.find((item) => item.id === jobId);
    if (!job) {
      toast('No encontramos ese coche', true);
      return;
    }
    if (job.status === status) {
      toast('Ya está en estado ' + STATUS[status].label);
      return;
    }
    const at = nowISO();
    job.status = status;
    job.updatedAt = at;
    job.history = Array.isArray(job.history) ? job.history : [];
    job.history.push({ status, at });
    if (!saveJobs(jobs)) return;
    render({ keepScroll: true });
    toast('Estado actualizado: ' + STATUS[status].label);
  }

  function approveQuoteManually(jobId, quoteId) {
    const jobs = loadJobs();
    const job = jobs.find((item) => item.id === jobId);
    if (!job) return;
    const quote = (Array.isArray(job.quotes) ? job.quotes : []).find((item) => item.id === quoteId);
    if (!quote) return;
    if (quote.status === 'aprobada') {
      toast('Esa cotización ya está aprobada');
      return;
    }
    if (!window.confirm('¿Marcar "' + quote.description + '" como aprobada?')) return;
    const at = nowISO();
    quote.status = 'aprobada';
    quote.approvedAt = at;
    job.updatedAt = at;
    if (!saveJobs(jobs)) return;
    render({ keepScroll: true });
    toast('Cotización marcada como aprobada');
  }

  function deleteQuote(jobId, quoteId) {
    const jobs = loadJobs();
    const job = jobs.find((item) => item.id === jobId);
    if (!job) return;
    const quote = (Array.isArray(job.quotes) ? job.quotes : []).find((item) => item.id === quoteId);
    if (!quote) return;
    if (!window.confirm('¿Eliminar la cotización "' + quote.description + '"?')) return;
    job.quotes = job.quotes.filter((item) => item.id !== quoteId);
    job.updatedAt = nowISO();
    if (!saveJobs(jobs)) return;
    render({ keepScroll: true });
    toast('Cotización eliminada');
  }

  function deleteJob(jobId) {
    const jobs = loadJobs();
    const job = jobs.find((item) => item.id === jobId);
    if (!job) return;
    if (!window.confirm('¿Eliminar el coche ' + job.plate + '? Esta acción no se puede deshacer.')) return;
    if (!saveJobs(jobs.filter((item) => item.id !== jobId))) return;
    ui.filter = null;
    ui.search = '';
    toast('Coche eliminado');
    go('#/');
  }

  function approveClientQuote(quoteId) {
    if (!clientContext) return;
    const job = clientContext.job;
    const quote = (job.quotes || []).find((item) => item.id === quoteId);
    if (!quote) return;
    if (quote.status === 'aprobada') {
      toast('Esta cotización ya está aprobada');
      return;
    }
    const at = nowISO();
    saveClientApproval(quote.id, at);
    quote.status = 'aprobada';
    quote.approvedAt = at;
    quote.approvedHere = true;
    toast('Cotización aprobada');
    render({ keepScroll: true });
    window.requestAnimationFrame(() => {
      const element = document.getElementById('cot-' + quote.id);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function copyApproval(quoteId) {
    if (!clientContext) return;
    const job = clientContext.job;
    const shop = clientContext.shop;
    const quote = (job.quotes || []).find((item) => item.id === quoteId);
    if (!quote || !quote.approvedAt) return;
    copyText(confirmationUrl(job, quote, quote.approvedAt, shop), 'Link de confirmación copiado');
  }

  function render(options) {
    const opts = options || {};
    const previousScroll = window.scrollY;
    const route = parseRoute();
    clientContext = null;

    if (route.name === 'cliente') {
      renderClient(route.arg);
      if (opts.keepScroll) window.scrollTo(0, previousScroll);
      return;
    }

    if (route.name === 'confirmar') {
      renderConfirmation(route.arg);
      window.scrollTo(0, 0);
      return;
    }

    const settings = loadSettings();
    const jobs = loadJobs();
    let content = '';
    let title = settings.shopName;
    let hasBottomBar = false;

    if (route.name === 'nuevo') {
      content = newJobView();
      title = 'Nuevo coche · ' + settings.shopName;
    } else if (route.name === 'coche') {
      const job = jobs.find((item) => item.id === route.arg);
      if (job) {
        content = jobDetailView(job);
        title = job.plate + ' · ' + settings.shopName;
      } else {
        content = missingJobView();
        title = 'Coche no encontrado · ' + settings.shopName;
      }
    } else if (route.name === 'ajustes') {
      content = settingsView(settings, jobs);
      title = 'Ajustes · ' + settings.shopName;
    } else {
      content = homeView(jobs);
      title = settings.shopName + ' · Control del taller';
      hasBottomBar = true;
    }

    document.title = title;
    app.innerHTML = shopShell(settings, content, hasBottomBar);

    if (route.name === 'inicio') applySearchFilter();
    if (opts.keepScroll) {
      window.scrollTo(0, previousScroll);
    } else {
      window.scrollTo(0, 0);
    }
  }

  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    const jobId = target.dataset.id || '';
    const quoteId = target.dataset.quote || '';

    if (action === 'filter') {
      const status = target.dataset.status;
      ui.filter = ui.filter === status ? null : status;
      render();
    } else if (action === 'clear-filter') {
      ui.filter = null;
      render();
    } else if (action === 'clear-search') {
      ui.search = '';
      render();
    } else if (action === 'change-status') {
      changeStatus(jobId, target.dataset.status);
    } else if (action === 'share-status') {
      shareStatus(jobId);
    } else if (action === 'copy-status') {
      copyClientLink(jobId);
    } else if (action === 'share-quote') {
      shareQuote(jobId);
    } else if (action === 'toggle-quote-form') {
      const wrapper = document.getElementById('quote-form-wrap');
      if (wrapper) {
        wrapper.hidden = !wrapper.hidden;
        if (!wrapper.hidden) {
          const input = document.getElementById('concepto');
          if (input) input.focus();
        }
      }
    } else if (action === 'approve-manual') {
      approveQuoteManually(jobId, quoteId);
    } else if (action === 'delete-quote') {
      deleteQuote(jobId, quoteId);
    } else if (action === 'delete-job') {
      deleteJob(jobId);
    } else if (action === 'export') {
      exportBackup();
    } else if (action === 'client-approve') {
      approveClientQuote(quoteId);
    } else if (action === 'copy-confirm') {
      copyApproval(quoteId);
    }
  });

  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (form.id === 'form-nuevo') {
      event.preventDefault();
      handleNewJob(form);
    } else if (form.id === 'form-cotizacion') {
      event.preventDefault();
      handleNewQuote(form);
    } else if (form.id === 'form-ajustes') {
      event.preventDefault();
      handleSettings(form);
    }
  });

  document.addEventListener('input', (event) => {
    const target = event.target;
    if (target.id === 'buscar') {
      ui.search = target.value;
      applySearchFilter();
    } else if (target.id === 'placa') {
      const start = target.selectionStart;
      target.value = target.value.toUpperCase();
      if (typeof start === 'number') {
        try {
          target.setSelectionRange(start, start);
        } catch (error) {
          /* El campo no admite selección en algunos navegadores. */
        }
      }
    }
  });

  document.addEventListener('change', async (event) => {
    if (event.target.id !== 'import-file') return;
    const input = event.target;
    const file = input.files && input.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const imported = Array.isArray(parsed) ? parsed : parsed && Array.isArray(parsed.jobs) ? parsed.jobs : null;
      const valid = imported && imported.every((job) => job && job.id && job.plate);
      if (!valid) throw new Error('Formato inválido');

      const current = loadJobs().length;
      const message = 'Se reemplazarán los ' + current + ' coches guardados por ' + imported.length + '. ¿Continuar?';
      if (!window.confirm(message)) return;

      if (!saveJobs(imported.map(normalizeJob))) return;
      if (parsed && parsed.settings && typeof parsed.settings === 'object') {
        const shopName = typeof parsed.settings.shopName === 'string' ? parsed.settings.shopName.trim() : '';
        const shopPhone = typeof parsed.settings.shopPhone === 'string' ? parsed.settings.shopPhone.trim() : '';
        if (shopName) writeJSON(APP.settingsKey, { shopName, shopPhone });
      }
      toast('Respaldo importado');
      render({ keepScroll: true });
    } catch (error) {
      toast('Ese archivo no es un respaldo válido', true);
    } finally {
      input.value = '';
    }
  });

  window.addEventListener('hashchange', () => render());
  render();
})();
