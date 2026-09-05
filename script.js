const navigationToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.primary-navigation');

if (navigationToggle && navigation) {
  navigationToggle.addEventListener('click', () => {
    const isOpen = navigationToggle.getAttribute('aria-expanded') === 'true';
    navigationToggle.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    navigationToggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  });
}

const incidentFlow = document.querySelector('.incident-flow');
const hfCaseTabs = Array.from(document.querySelectorAll('[data-hf-case-tab]'));
const pathToggle = document.querySelector('[data-path-toggle]');
const flowLimit = document.querySelector('[data-flow-limit]');
const traceId = document.querySelector('[data-trace-id]');
const consoleState = document.querySelector('[data-console-state]');
const traceRows = Array.from({ length: 5 }, (_, index) => ({
  time: document.querySelector(`[data-trace-${index + 1}-time]`),
  kind: document.querySelector(`[data-trace-${index + 1}-kind]`),
  value: document.querySelector(`[data-trace-${index + 1}-value]`),
}));
const flowFields = {
  sourceTitle: document.querySelector('[data-dag-source-title]'),
  sourceCode: document.querySelector('[data-dag-source-code]'),
  processTitle: document.querySelector('[data-dag-process-title]'),
  processCode: document.querySelector('[data-dag-process-code]'),
  actionTitle: document.querySelector('[data-dag-action-title]'),
  actionCode: document.querySelector('[data-dag-action-code]'),
  actionKind: document.querySelector('[data-dag-action-kind]'),
  actualGateTitle: document.querySelector('[data-dag-actual-gate-title]'),
  actualGateCode: document.querySelector('[data-dag-actual-gate-code]'),
  actualGateKind: document.querySelector('[data-dag-actual-gate-kind]'),
  actualResultTitle: document.querySelector('[data-dag-actual-result-title]'),
  actualResultCode: document.querySelector('[data-dag-actual-result-code]'),
  actualResultKind: document.querySelector('[data-dag-actual-result-kind]'),
  actualTailTitle: document.querySelector('[data-dag-actual-tail-title]'),
  actualTailCode: document.querySelector('[data-dag-actual-tail-code]'),
  actualTailKind: document.querySelector('[data-dag-actual-tail-kind]'),
  araphorGateTitle: document.querySelector('[data-dag-araphor-gate-title]'),
  araphorGateCode: document.querySelector('[data-dag-araphor-gate-code]'),
  araphorGateKind: document.querySelector('[data-dag-araphor-gate-kind]'),
  araphorResultTitle: document.querySelector('[data-dag-araphor-result-title]'),
  araphorResultCode: document.querySelector('[data-dag-araphor-result-code]'),
  araphorResultKind: document.querySelector('[data-dag-araphor-result-kind]'),
};

const hfCases = {
  secrets: {
    traceId: 'HF-009',
    sourceTitle: 'Dataset input accepted',
    sourceCode: '14 valid HF credentials',
    processTitle: 'Conversion worker active',
    processCode: 'worker-a',
    actionTitle: 'Protected file open requested',
    actionCode: '/proc/self/environ',
    actionKind: 'FILE',
    actualGateTitle: 'Request allowed',
    actualGateCode: 'FILE · SUCCEEDED',
    actualGateKind: 'FILE',
    actualResultTitle: 'Secrets returned as rows',
    actualResultCode: 'HARM CONFIRMED',
    actualResultKind: 'EFFECT',
    actualTailTitle: 'Agent continues the intrusion',
    actualTailCode: '17,600 actions · 4.5 days',
    actualTailKind: 'FOLLOW-ON',
    araphorGateTitle: 'Policy denies file open',
    araphorGateCode: 'FILE · DENIED',
    araphorGateKind: 'FILE POLICY',
    araphorResultTitle: 'Secret remains unread',
    araphorResultCode: '0 bytes · worker healthy',
    araphorResultKind: 'EVIDENCE',
    limit: 'Araphor would deny the file open before the worker receives a descriptor or any bytes.',
  },
  shell: {
    traceId: 'PROCESS · EXECUTE',
    sourceTitle: 'Jinja2 payload accepted',
    sourceCode: 'builtins.exec("<payload>")',
    processTitle: 'Injected Python active',
    processCode: 'existing worker process',
    actionTitle: 'Shell process requested',
    actionCode: '2,911 direct shell commands',
    actionKind: 'PROCESS',
    actualGateTitle: 'Process allowed',
    actualGateCode: 'PROCESS · STARTED',
    actualGateKind: 'PROCESS',
    actualResultTitle: 'Command expands access',
    actualResultCode: 'cat token · curl APIs',
    actualResultKind: 'EFFECT',
    actualTailTitle: 'Self-respawning workers persist',
    actualTailCode: 'self-respawning fleet',
    actualTailKind: 'FOLLOW-ON',
    araphorGateTitle: 'Policy denies process exec',
    araphorGateCode: 'PROCESS · DENIED',
    araphorGateKind: 'EXEC POLICY',
    araphorResultTitle: 'No child process starts',
    araphorResultCode: 'no shell · no shell effect',
    araphorResultKind: 'EVIDENCE',
    limit: 'The injected Python ran inside the worker. Araphor would deny its first new process before that process starts.',
  },
  root: {
    traceId: 'HF-011',
    sourceTitle: 'Injected Python remains active',
    sourceCode: 'existing worker process',
    processTitle: 'Worker requests projected token',
    processCode: 'serviceaccount/token',
    actionTitle: 'Protected token open requested',
    actionCode: '/var/run/secrets/.../token',
    actionKind: 'FILE',
    actualGateTitle: 'Token read succeeds',
    actualGateCode: 'FILE · SUCCEEDED',
    actualGateKind: 'FILE',
    actualResultTitle: 'Agent reaches Kubernetes API',
    actualResultCode: 'curl -k .../api',
    actualResultKind: 'NETWORK',
    actualTailTitle: 'Privileged Pod reaches node root',
    actualTailCode: '11 nodes · Secret with 136 keys',
    actualTailKind: 'KUBERNETES',
    araphorGateTitle: 'Policy denies token open',
    araphorGateCode: 'FILE · EACCES',
    araphorGateKind: 'FILE POLICY',
    araphorResultTitle: 'No cluster credential leaves',
    araphorResultCode: 'no descriptor · 0 bytes',
    araphorResultKind: 'EVIDENCE',
    limit: 'Araphor would deny the service-account token open. Admission policy provides a second stop before Kubernetes stores a privileged Pod.',
  },
};

let flowTimer;

function renderDecisionTrace(activePath) {
  if (!incidentFlow) return;
  const content = hfCases[incidentFlow.dataset.hfCase];
  if (!content) return;

  const rows = activePath === 'araphor'
    ? [
        ['EVENT 01', 'REQUEST', content.actionCode],
        ['MATCHED', 'POLICY', content.araphorGateTitle],
        ['ENFORCED', 'DECISION', content.araphorGateCode],
        ['RETURNED', 'RESULT', content.araphorResultTitle],
        ['PROOF', 'VERIFIED', content.araphorResultCode],
      ]
    : [
        ['EVENT 01', 'REQUEST', content.actionCode],
        ['EVENT 02', 'DECISION', content.actualGateCode],
        ['EVENT 03', 'EFFECT', content.actualResultTitle],
        ['EVENT 04', 'FOLLOW-ON', content.actualTailTitle],
        ['OUTCOME', 'RECORDED', content.actualTailCode],
      ];

  if (traceId) traceId.textContent = content.traceId;
  if (consoleState) consoleState.textContent = activePath === 'araphor' ? 'PREVENTED' : 'PUBLISHED PATH';
  traceRows.forEach((row, index) => {
    if (row.time) row.time.textContent = rows[index][0];
    if (row.kind) row.kind.textContent = rows[index][1];
    if (row.value) row.value.textContent = rows[index][2];
  });
}

function resetFlow(activePath = 'actual') {
  if (!incidentFlow || !pathToggle) return;
  window.clearTimeout(flowTimer);
  incidentFlow.dataset.flowState = 'idle';
  incidentFlow.dataset.activePath = activePath;
  pathToggle.setAttribute('aria-checked', String(activePath === 'araphor'));
}

function selectHfCase(caseName) {
  const content = hfCases[caseName];
  if (!content || !incidentFlow) return;

  resetFlow();
  incidentFlow.dataset.hfCase = caseName;
  Object.entries(flowFields).forEach(([key, element]) => {
    if (element) element.textContent = content[key];
  });
  if (flowLimit) flowLimit.textContent = content.limit;
  renderDecisionTrace('actual');

  hfCaseTabs.forEach((tab) => {
    const isSelected = tab.dataset.hfCaseTab === caseName;
    tab.classList.toggle('is-active', isSelected);
    tab.setAttribute('aria-selected', String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  });
}

function runPath(activePath) {
  if (!incidentFlow || !pathToggle) return;

  window.clearTimeout(flowTimer);
  incidentFlow.dataset.flowState = 'idle';
  incidentFlow.dataset.activePath = activePath;
  pathToggle.setAttribute('aria-checked', String(activePath === 'araphor'));
  renderDecisionTrace(activePath);
  void incidentFlow.offsetWidth;
  incidentFlow.dataset.flowState = 'running';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  flowTimer = window.setTimeout(() => {
    incidentFlow.dataset.flowState = 'done';
  }, reducedMotion ? 0 : 2600);
}

function togglePath() {
  if (!incidentFlow) return;
  const nextPath = incidentFlow.dataset.activePath === 'araphor' ? 'actual' : 'araphor';
  runPath(nextPath);
}

hfCaseTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectHfCase(tab.dataset.hfCaseTab));
  tab.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + offset + hfCaseTabs.length) % hfCaseTabs.length;
    const nextTab = hfCaseTabs[nextIndex];
    selectHfCase(nextTab.dataset.hfCaseTab);
    nextTab.focus();
  });
});

pathToggle?.addEventListener('click', togglePath);

const productTabs = Array.from(document.querySelectorAll('[data-product-tab]'));
const productPanels = Array.from(document.querySelectorAll('[data-product-panel]'));

function selectProductView(view) {
  productTabs.forEach((tab) => {
    const isSelected = tab.dataset.productTab === view;
    tab.classList.toggle('is-active', isSelected);
    tab.setAttribute('aria-selected', String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  });

  productPanels.forEach((panel) => {
    panel.hidden = panel.dataset.productPanel !== view;
  });
}

productTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectProductView(tab.dataset.productTab));
  tab.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + offset + productTabs.length) % productTabs.length;
    const nextTab = productTabs[nextIndex];
    selectProductView(nextTab.dataset.productTab);
    nextTab.focus();
  });
});

const accessForm = document.querySelector('.access-form');
const formStatus = document.querySelector('.form-status');
const calcomEventUrl = '';

if (accessForm && formStatus) {
  accessForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!accessForm.checkValidity()) {
      accessForm.reportValidity();
      formStatus.textContent = 'Enter a valid work email.';
      return;
    }

    formStatus.textContent = 'The early-access form is not connected yet.';
  });
}

if (calcomEventUrl) {
  document.querySelectorAll('[data-calcom]').forEach((link) => {
    link.href = calcomEventUrl;
    link.target = '_blank';
    link.rel = 'noreferrer';
  });
}

const editMode = new URLSearchParams(window.location.search).get('edit') === '1';
if (editMode) {
  document.documentElement.dataset.editMode = 'true';
  document.querySelectorAll('[data-editable]').forEach((element) => {
    element.contentEditable = 'true';
    element.spellcheck = true;
  });
}

async function enablePretextLayout() {
  try {
    const { prepare, layout } = await import('@chenglou/pretext');
    await document.fonts.ready;

    const elements = Array.from(document.querySelectorAll('[data-pretext]'));
    const prepared = new Map();

    function prepareElement(element) {
      prepared.set(element, prepare(element.textContent.trim(), getComputedStyle(element).font));
    }

    function relayout() {
      prepared.forEach((handle, element) => {
        const lineHeight = Number.parseFloat(getComputedStyle(element).lineHeight);
        if (!element.clientWidth || !Number.isFinite(lineHeight)) return;
        const result = layout(handle, element.clientWidth, lineHeight);
        element.style.minHeight = `${Math.ceil(result.height)}px`;
      });
    }

    elements.forEach((element) => {
      prepareElement(element);
      if (element.contentEditable === 'true') {
        new MutationObserver(() => {
          prepareElement(element);
          relayout();
        }).observe(element, { characterData: true, subtree: true, childList: true });
      }
    });

    const resizeObserver = new ResizeObserver(relayout);
    document.querySelectorAll('.shell').forEach((container) => resizeObserver.observe(container));
    relayout();
    document.documentElement.dataset.pretext = 'ready';
  } catch {
    document.documentElement.dataset.pretext = 'css-fallback';
  }
}

enablePretextLayout();
