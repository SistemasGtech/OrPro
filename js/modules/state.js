export function carregarObjetoSeguro(chave, valorPadrao) {
  try {
    const item = localStorage.getItem(chave);
    if (item === null || item === undefined) return valorPadrao;
    return JSON.parse(item);
  } catch (e) {
    console.warn(`Erro ao carregar "${chave}" do localStorage:`, e);
    return valorPadrao;
  }
}

export function normalizarCliente(c) {
  return {
    id: String(c.id),
    nome: String(c.nome || '').trim(),
    telefone: String(c.telefone || '').trim()
  };
}

export function normalizarMaterial(m) {
  return {
    id: String(m.id),
    nome: m.nome || '',
    espessura: m.espessura || '',
    chapaLargura: Number(m.chapa_largura ?? m.chapaLargura) || 0,
    chapaComprimento: Number(m.chapa_comprimento ?? m.chapaComprimento) || 0,
    tamanhoChapa: m.tamanho_chapa || m.tamanhoChapa || '',
    custoChapa: Number(m.custo_chapa ?? m.custoChapa) || 0,
    custoM2: Number(m.custo_m2 ?? m.custoM2) || 0,
    sobra: Number(m.sobra) || 0,
    valorM2: Number(m.valor_m2 ?? m.valorM2) || 0
  };
}

export function normalizarServico(s) {
  return {
    id: String(s.id),
    nome: s.nome || '',
    valor: Number(s.valor) || 0
  };
}

// Estados Globais
export const state = {
  supabaseClient: null,
  configSupabase: carregarObjetoSeguro('orca_config_supabase', { 
    url: 'https://potacfncfipnvuaupbmb.supabase.co', 
    key: 'sb_publishable_Wguhy54CtowiRJRNqWjNmQ_6lR0u68G' 
  }),
  dadosEmpresa: carregarObjetoSeguro('orca_dados_empresa', {
    nome: 'GTech Automatização',
    documento: '',
    telefone: '',
    email: '',
    endereco: '',
    pix: ''
  }),
  catalogoServicos: (carregarObjetoSeguro('orca_catalogo_servicos', []) || []).map(normalizarServico),
  catalogoMateriais: (carregarObjetoSeguro('orca_catalogo_materiais', []) || []).map(normalizarMaterial),
  catalogoClientes: (carregarObjetoSeguro('orca_catalogo_clientes', []) || []).map(normalizarCliente),
  listaUsuarios: carregarObjetoSeguro('orca_usuarios', [
    { id: 'usr_admin', nome: 'Administrador Principal', login: 'admin', email: 'admin@gtech.com.br', telefone: '(11) 99888-7766', senha: '123', perfil: 'Administrador' }
  ]),
  historicoOrcamentos: carregarObjetoSeguro('orca_historico_orcamentos', []),
  tempServicosItem: {},
  itensOrcamento: [],
  ultimoPedidoFechado: null,
  codigoRecuperacaoGerado: null,
  usuarioRecuperacaoAtivo: null,
  filtroStatusAtivo: 'TODOS'
};