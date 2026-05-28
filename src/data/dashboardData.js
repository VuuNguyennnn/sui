export const utilityFlows = [
  {
    title: 'Automated Salary Streaming',
    description: 'Stream payroll in real time, then route excess balance into low-risk yield vaults.',
    status: 'Live stream policy',
    value: '$420k monthly',
  },
  {
    title: 'Intelligent Routing Vault',
    description: 'Split treasury deposits across best execution routes with atomic PTB settlement.',
    status: 'Allocator active',
    value: '$8.4M routed',
  },
  {
    title: 'Payment-Linked Credit',
    description: 'Underwrite revolving limits from verifiable payment history and recurring cash flow.',
    status: 'Risk model online',
    value: '1,280 accounts',
  },
  {
    title: 'Milestone Escrow',
    description: 'Lock capital in programmable escrow and release funds automatically on milestone proofs.',
    status: '3 escrows pending',
    value: '$1.1M secured',
  },
];

export const timelineEntries = [
  { time: '09:14', title: 'Wallet authenticated', detail: 'zkLogin session refreshed for treasury operator.', tone: 'neutral' },
  { time: '09:17', title: 'Intent compiled', detail: 'Payroll to USDC -> Yield Vault PTB generated.', tone: 'info' },
  { time: '09:18', title: 'Guardian warning', detail: 'Route B flagged for thin liquidity depth on stable exit.', tone: 'warning' },
  { time: '09:20', title: 'Atomic route approved', detail: 'Fallback route selected with lower slippage and safer concentration.', tone: 'positive' },
];

export const guardianChecks = [
  { title: 'Slippage Guard', detail: 'Flags routes above 0.8% expected slippage or unstable pool depth.', severity: 'warning' },
  { title: 'Concentration Guard', detail: 'Prevents over-allocation into a single LP, vault, or collateral route.', severity: 'neutral' },
  { title: 'Stale Liquidity Guard', detail: 'Rejects routes with out-of-date quotes or unhealthy venue heartbeat.', severity: 'positive' },
];
