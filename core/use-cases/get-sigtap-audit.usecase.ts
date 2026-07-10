import { Injectable, Inject } from '@nestjs/common';
import { ISigtapRepository } from '../domain/repositories/sigtap-repository.interface';
import { ChangeLog } from '../domain/entities/change-log';

@Injectable()
export class GetSigtapAuditUseCase {
  constructor(
    @Inject(ISigtapRepository)
    private readonly repo: ISigtapRepository,
  ) {}

  async execute(competencia: string, format: 'json' | 'html' | 'html-download' | 'csv' = 'json') {
    if (!competencia || competencia.length !== 6) {
      throw new Error('A competência informada é inválida (deve conter 6 caracteres, ex: 202504)');
    }

    const logs = await this.repo.getRecentLogs(competencia);

    const summary: Record<string, number> = {};
    const details = logs.map((log) => {
      summary[log.entity] = (summary[log.entity] || 0) + 1;
      return {
        id: log.id,
        entity: log.entity,
        record_id: log.entityId,
        field: log.field,
        old_value: log.oldValue,
        new_value: log.newValue,
        changed_at: log.changedAt,
        changed_by: log.changedBy,
      };
    });

    if (format === 'html' || format === 'html-download') {
      return this.renderHtmlReport(competencia, logs.length, summary, details);
    }

    if (format === 'csv') {
      return this.renderCsvReport(details);
    }

    return {
      competencia,
      total_changes: logs.length,
      summary,
      details,
    };
  }

  private renderCsvReport(details: any[]): string {
    const header = 'Entidade;Registro (ID);Coluna;Valor Antigo;Valor Novo;Data de Alteracao;Alterado Por\r\n';
    const rows = details.map((d) => {
      const entity = d.entity || '';
      const recordId = d.record_id || '';
      const field = d.field || '';
      const oldValue = (d.old_value || '').replace(/"/g, '""');
      const newValue = (d.new_value || '').replace(/"/g, '""');
      const date = d.changed_at ? new Date(d.changed_at).toLocaleString('pt-BR') : '';
      const user = d.changed_by || 'system';

      return `"${entity}";"${recordId}";"${field}";"${oldValue}";"${newValue}";"${date}";"${user}"`;
    }).join('\r\n');

    return header + rows;
  }

  private renderHtmlReport(
    competencia: string,
    totalChanges: number,
    summary: Record<string, number>,
    details: any[],
  ): string {
    const competenceFormatted = `${competencia.slice(4, 6)}/${competencia.slice(0, 4)}`;

    // Agrupa detalhes por entidade
    const groupedDetails: Record<string, any[]> = {};
    for (const d of details) {
      if (!groupedDetails[d.entity]) {
        groupedDetails[d.entity] = [];
      }
      groupedDetails[d.entity].push(d);
    }

    const entities = Object.keys(groupedDetails);

    // Gera os botões das abas
    const tabsHtml = entities.map((entity, index) => `
      <button 
        onclick="switchTab('${entity}')" 
        id="tab-btn-${entity}" 
        class="tab-button px-5 py-3 text-sm font-semibold rounded-lg transition-all ${index === 0 ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
      >
        ${entity} (${groupedDetails[entity].length})
      </button>
    `).join('');

    // Gera os contêineres de tabelas agrupadas
    const tablesHtml = entities.map((entity, index) => {
      const rowsHtml = groupedDetails[entity].map(d => `
        <tr class="hover:bg-slate-50 border-b border-slate-100 transition-colors">
          <td class="px-6 py-4 text-sm text-slate-600 font-mono">${d.record_id}</td>
          <td class="px-6 py-4 text-sm text-slate-600 font-mono">${d.field}</td>
          <td class="px-6 py-4 text-sm text-red-600 bg-red-50/50 line-through rounded">${d.old_value || '<em>null</em>'}</td>
          <td class="px-6 py-4 text-sm text-emerald-600 bg-emerald-50/50 font-semibold rounded">${d.new_value || '<em>null</em>'}</td>
          <td class="px-6 py-4 text-sm text-slate-500">${new Date(d.changed_at).toLocaleString('pt-BR')}</td>
        </tr>
      `).join('');

      return `
        <div id="tab-content-${entity}" class="tab-content ${index === 0 ? '' : 'hidden'}">
          <div class="overflow-hidden border border-slate-200 rounded-2xl shadow-sm bg-white mt-4">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-200 text-left">
                <thead class="bg-slate-50/75">
                  <tr>
                    <th scope="col" class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Registro (ID)</th>
                    <th scope="col" class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Coluna</th>
                    <th scope="col" class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">De (Valor Antigo)</th>
                    <th scope="col" class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Para (Valor Novo)</th>
                    <th scope="col" class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Data de Alteração</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 bg-white">
                  ${rowsHtml}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Gera as tags do sumário
    const summaryHtml = Object.entries(summary).map(([entity, count]) => `
      <div class="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <span class="text-sm font-semibold text-slate-500 tracking-wide uppercase">${entity}</span>
        <span class="text-3xl font-extrabold text-slate-800 mt-2">${count} <span class="text-sm font-normal text-slate-400">alterações</span></span>
      </div>
    `).join('');

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Auditoria SIGTAP - Competência ${competenceFormatted}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
        </style>
      </head>
      <body class="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          
          <!-- Cabeçalho -->
          <div class="flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-slate-200/80">
            <div>
              <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Relatório de Auditoria</h1>
              <p class="mt-2 text-sm text-slate-500">Histórico detalhado de alterações nos dados importados do SIGTAP.</p>
            </div>
            <div class="mt-4 md:mt-0 flex items-center space-x-3">
              <span class="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10">
                Competência ${competenceFormatted}
              </span>
              <span class="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-600/10">
                ${totalChanges} alterações registradas
              </span>
            </div>
          </div>

          <!-- Seção de Sumário -->
          <div class="mt-8">
            <h2 class="text-lg font-bold text-slate-800 tracking-tight">Resumo por Entidade</h2>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-4">
              ${summaryHtml || '<p class="text-slate-500 text-sm">Nenhuma alteração registrada para esta competência.</p>'}
            </div>
          </div>

          <!-- Abas de Navegação -->
          ${entities.length > 0 ? `
            <div class="mt-10">
              <h2 class="text-lg font-bold text-slate-800 tracking-tight">Histórico por Tópico</h2>
              <div class="flex flex-wrap gap-2 mt-4 border-b border-slate-200 pb-3">
                ${tabsHtml}
              </div>
              <div class="mt-2">
                ${tablesHtml}
              </div>
            </div>
          ` : `
            <div class="mt-10 bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-400">
              Nenhum histórico de auditoria encontrado para a competência informada.
            </div>
          `}

        </div>

        <script>
          function switchTab(activeEntity) {
            // Esconde todas as tabelas
            const contents = document.querySelectorAll('.tab-content');
            contents.forEach(el => el.classList.add('hidden'));

            // Remove o estilo ativo de todos os botões
            const buttons = document.querySelectorAll('.tab-button');
            buttons.forEach(btn => {
              btn.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
              btn.classList.add('text-slate-600', 'hover:text-slate-900', 'hover:bg-slate-100');
            });

            // Mostra a tabela ativa
            const activeContent = document.getElementById('tab-content-' + activeEntity);
            if (activeContent) {
              activeContent.classList.remove('hidden');
            }

            // Ativa o estilo no botão clicado
            const activeBtn = document.getElementById('tab-btn-' + activeEntity);
            if (activeBtn) {
              activeBtn.classList.remove('text-slate-600', 'hover:text-slate-900', 'hover:bg-slate-100');
              activeBtn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
            }
          }
        </script>
      </body>
      </html>
    `;
  }
}
