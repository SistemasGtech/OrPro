import { state } from './modules/state.js';
import { inicializarSupabase } from './modules/api.js';
import { verificarSessao, realizarLogin, realizarLogout, abrirModalRecuperarSenha, fecharModalRecuperarSenha } from './modules/auth.js';
import { abrirModalClientes, fecharModalClientes, abrirModalServicos, fecharModalServicos, abrirModalCatalogoMateriais, fecharModalCatalogoMateriais, abrirModalEmpresa, fecharModalEmpresa } from './modules/catalog.js';
import { adicionarItemAoOrcamento, fecharPedido, fecharModalPedido, abrirModalHistorico, fecharModalHistorico, abrirModalFinanceiro, fecharModalFinanceiro, limparTudo } from './modules/orcamento.js';
import { gerarPDFProposta, imprimirOrcamento, enviarWhatsApp, enviarEmail } from './modules/export.js';

// Vínculos globais para eventos inline do HTML (onclick, oninput, onsubmit)
window.realizarLogin = realizarLogin;
window.realizarLogout = realizarLogout;
window.abrirModalRecuperarSenha = abrirModalRecuperarSenha;
window.fecharModalRecuperarSenha = fecharModalRecuperarSenha;

window.abrirModalClientes = abrirModalClientes;
window.fecharModalClientes = fecharModalClientes;
window.abrirModalServicos = abrirModalServicos;
window.fecharModalServicos = fecharModalServicos;
window.abrirModalCatalogoMateriais = abrirModalCatalogoMateriais;
window.fecharModalCatalogoMateriais = fecharModalCatalogoMateriais;
window.abrirModalEmpresa = abrirModalEmpresa;
window.fecharModalEmpresa = fecharModalEmpresa;

window.adicionarItemAoOrcamento = adicionarItemAoOrcamento;
window.fecharPedido = fecharPedido;
window.fecharModalPedido = fecharModalPedido;
window.abrirModalHistorico = abrirModalHistorico;
window.fecharModalHistorico = fecharModalHistorico;
window.abrirModalFinanceiro = abrirModalFinanceiro;
window.fecharModalFinanceiro = fecharModalFinanceiro;
window.limparTudo = limparTudo;

window.gerarPDFProposta = gerarPDFProposta;
window.imprimirOrcamento = imprimirOrcamento;
window.enviarWhatsApp = enviarWhatsApp;
window.enviarEmail = enviarEmail;

// Inicialização da Aplicação
document.addEventListener('DOMContentLoaded', () => {
  verificarSessao();
  inicializarSupabase();

  const hoje = new Date().toISOString().split('T')[0];
  const validade = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  if (document.getElementById('dataOrcamento')) document.getElementById('dataOrcamento').value = hoje;
  if (document.getElementById('validadeOrcamento')) document.getElementById('validadeOrcamento').value = validade;
});