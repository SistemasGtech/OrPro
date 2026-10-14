export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);
}

export function mostrarToast(mensagem, tipo = 'sucesso') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');
  if (!toast || !toastMsg) return;

  toastMsg.innerText = mensagem;

  if (tipo === 'erro') {
    toast.className = "fixed bottom-5 right-5 bg-rose-900 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-xl transition-all duration-300 transform translate-y-0 opacity-100 z-50 flex items-center space-x-2.5 pointer-events-none";
    if (toastIcon) toastIcon.className = "fa-solid fa-triangle-exclamation text-rose-400 text-sm";
  } else {
    toast.className = "fixed bottom-5 right-5 bg-slate-900 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-xl transition-all duration-300 transform translate-y-0 opacity-100 z-50 flex items-center space-x-2.5 pointer-events-none";
    if (toastIcon) toastIcon.className = "fa-solid fa-circle-check text-emerald-400 text-sm";
  }

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3500);
}

export function mascararTelefoneInput(input) {
  if (!input) return;
  let v = input.value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  
  if (v.length > 10) {
    input.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  } else if (v.length > 6) {
    input.value = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
  } else if (v.length > 2) {
    input.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
  } else if (v.length > 0) {
    input.value = `(${v}`;
  } else {
    input.value = '';
  }
}