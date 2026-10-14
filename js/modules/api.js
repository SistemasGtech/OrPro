import { state, normalizarServico, normalizarMaterial, normalizarCliente } from './state.js';
import { mostrarToast } from './ui.js';

export async function hashSenha(senha) {
  if (!senha) return '';
  if (!window.crypto || !window.crypto.subtle) return senha;
  try {
    const msgBuffer = new TextEncoder().encode(senha);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    console.warn('Crypto API indisponível, utilizando senha direta:', e);
    return senha;
  }
}

export function inicializarSupabase() {
  const url = state.configSupabase.url || '';
  const key = state.configSupabase.key || '';
  const badge = document.getElementById('statusSupabaseBadge');

  if (url && key && window.supabase && window.supabase.createClient) {
    try {
      state.supabaseClient = window.supabase.createClient(url, key);
      window.supabaseClient = state.supabaseClient;
      if (badge) {
        badge.className = 'text-[10px] font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider flex items-center';
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span> Conectado`;
      }
      carregarDadosDoSupabase();
    } catch(e) {
      console.error('Erro ao conectar com Supabase:', e);
      if (badge) {
        badge.className = 'text-[10px] font-extrabold px-3 py-1 rounded-full bg-rose-100 text-rose-800 uppercase tracking-wider flex items-center';
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-rose-500 mr-1.5"></span> Erro de Conexão`;
      }
    }
  } else if (badge) {
    badge.className = 'text-[10px] font-extrabold px-3 py-1 rounded-full bg-slate-200 text-slate-700 uppercase tracking-wider flex items-center';
    badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-slate-400 mr-1.5"></span> Desconectado`;
  }
}

export async function carregarDadosDoSupabase() {
  if (!state.supabaseClient) return;

  try {
    const { data: usrs, error: errUsrs } = await state.supabaseClient.from('usuarios').select('*');
    if (!errUsrs && usrs && usrs.length > 0) {
      state.listaUsuarios = usrs;
      localStorage.setItem('orca_usuarios', JSON.stringify(state.listaUsuarios));
    }

    const { data: srvs, error: errSrvs } = await state.supabaseClient.from('servicos').select('*');
    if (!errSrvs && srvs) {
      state.catalogoServicos = srvs.map(normalizarServico);
      localStorage.setItem('orca_catalogo_servicos', JSON.stringify(state.catalogoServicos));
    }

    const { data: mats, error: errMats } = await state.supabaseClient.from('materiais').select('*');
    if (!errMats && mats) {
      state.catalogoMateriais = mats.map(normalizarMaterial);
      localStorage.setItem('orca_catalogo_materiais', JSON.stringify(state.catalogoMateriais));
    }

    const { data: clis, error: errClis } = await state.supabaseClient.from('clientes').select('*');
    if (!errClis && clis) {
      state.catalogoClientes = clis.map(normalizarCliente);
      localStorage.setItem('orca_catalogo_clientes', JSON.stringify(state.catalogoClientes));
    }
  } catch (err) {
    console.warn('Aviso ao sincronizar dados da nuvem:', err);
  }
}