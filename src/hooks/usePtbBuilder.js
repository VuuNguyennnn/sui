import { useMemo, useState } from 'react';

const defaultFlow = [
  {
    id: 'pay',
    label: 'Pay',
    description: 'Receive incoming payroll or treasury capital.',
    risk: 'low',
  },
  {
    id: 'swap',
    label: 'Swap',
    description: 'Route into the target asset with slippage constraints.',
    risk: 'medium',
  },
  {
    id: 'deposit',
    label: 'Deposit',
    description: 'Allocate proceeds into a vault or yield strategy.',
    risk: 'low',
  },
];

const intentTemplates = {
  salary: [
    { id: 'receive', label: 'Receive Payroll', description: 'Accept streamed payroll into a controlled treasury object.', risk: 'low' },
    { id: 'convert', label: 'Convert to Stable', description: 'Swap a portion of payroll into USDC under slippage controls.', risk: 'medium' },
    { id: 'yield', label: 'Allocate to Yield', description: 'Deposit excess working capital into a low-risk vault strategy.', risk: 'low' },
  ],
  escrow: [
    { id: 'lock', label: 'Lock Escrow', description: 'Move capital into a milestone-bound escrow object.', risk: 'low' },
    { id: 'verify', label: 'Verify Milestone', description: 'Check completion state and release conditions.', risk: 'medium' },
    { id: 'release', label: 'Release Funds', description: 'Atomically disburse approved tranche to counterparty.', risk: 'low' },
  ],
  credit: [
    { id: 'analyze', label: 'Analyze Payment History', description: 'Score recurring inflows and controlled spending behavior.', risk: 'medium' },
    { id: 'underwrite', label: 'Issue Credit Limit', description: 'Mint a trust-minimized revolving credit line.', risk: 'medium' },
    { id: 'repay', label: 'Schedule Repayment', description: 'Bind repayments to future payment flows automatically.', risk: 'low' },
  ],
};

export function usePtbBuilder() {
  const [submitting, setSubmitting] = useState(false);
  const [lastExecution, setLastExecution] = useState(null);
  const [building, setBuilding] = useState(false);

  const preview = useMemo(() => defaultFlow, []);

  const buildFromIntent = async (intentText) => {
    setBuilding(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const normalized = intentText.toLowerCase();
    let actions = defaultFlow;
    if (normalized.includes('salary') || normalized.includes('payroll')) {
      actions = intentTemplates.salary;
    } else if (normalized.includes('escrow') || normalized.includes('milestone')) {
      actions = intentTemplates.escrow;
    } else if (normalized.includes('credit') || normalized.includes('loan')) {
      actions = intentTemplates.credit;
    }

    setBuilding(false);
    return {
      intent: intentText,
      actions,
      summary: 'Atomic PTB generated for programmable money flow with guardian-aware routing and object-safe execution.',
    };
  };

  const executeFlow = async (flowName) => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const result = {
      success: true,
      digest: `PTB-${Date.now()}`,
      flowName,
      timestamp: new Date().toISOString(),
    };

    setLastExecution(result);
    setSubmitting(false);
    return result;
  };

  return {
    preview,
    building,
    submitting,
    lastExecution,
    buildFromIntent,
    executeFlow,
  };
}
