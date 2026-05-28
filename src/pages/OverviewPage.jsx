import { motion } from 'framer-motion';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import IntentEngine from '../components/IntentEngine';
import PtbPreviewPanel from '../components/PtbPreviewPanel';
import GuardianPanel from '../components/GuardianPanel';
import ActivityTimeline from '../components/ActivityTimeline';
import UtilityFlowsPanel from '../components/UtilityFlowsPanel';
import PortfolioPanel from '../components/PortfolioPanel';
import ObjectVisualizer from '../components/ObjectVisualizer';
import ExecutionConsole from '../components/ExecutionConsole';
import StatsGrid from '../components/StatsGrid';
import TvlChart from '../components/TvlChart';
import { usePtbBuilder } from '../hooks/usePtbBuilder';

function OverviewPage() {
  const { addToast, addLog, logs } = useOutletContext();
  const [intentText, setIntentText] = useState(
    'Convert 500 SUI to USDC, keep slippage below 0.5%, deposit the proceeds into a treasury vault, and schedule salary streaming.',
  );
  const [previewData, setPreviewData] = useState({
    summary: 'Atomic PTB generated for programmable money flow with guardian-aware routing and object-safe execution.',
    actions: [
      { id: 'pay', label: 'Pay', description: 'Receive incoming payroll or treasury capital.', risk: 'low' },
      { id: 'swap', label: 'Swap', description: 'Route into the target asset with slippage constraints.', risk: 'medium' },
      { id: 'deposit', label: 'Deposit', description: 'Allocate proceeds into a vault or yield strategy.', risk: 'low' },
    ],
  });
  const { buildFromIntent, executeFlow, lastExecution, building } = usePtbBuilder();

  const handleBuildIntent = async () => {
    addLog('Intent compilation started', 'Parsing natural language objective into PTB action graph.');
    const result = await buildFromIntent(intentText);
    setPreviewData(result);
    addToast('PTB Compiled', 'Intent translated into programmable transaction blocks.');
    addLog('PTB preview generated', 'Atomic flow graph prepared for guardian review.');
  };

  const handleRunDemo = async () => {
    const demoIntent =
      'Route payroll to USDC, allocate surplus into yield vault, then create milestone escrow for vendor payout.';
    setIntentText(demoIntent);
    addToast('Demo Mode Running', 'Simulating a flagship programmable money flow.');
    addLog('Demo mode started', 'Loading payroll -> stable -> vault -> escrow showcase.');
    const result = await buildFromIntent(demoIntent);
    setPreviewData(result);
    await executeFlow('demo-mode');
    addLog('Execution simulated', 'Demo flow completed with synthetic PTB digest returned.');
  };

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel neon-outline rounded-[2rem] p-6 md:p-8"
      >
        <p className="text-xs uppercase tracking-[0.34em] text-[#9fd4ff]">Overview</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[0.04em] text-white md:text-5xl">
          SUI PROGRAMMABLE MONEY
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/68">
          A cyberpunk-native DeFi control surface for programmable capital flows on Sui, combining
          premium UX, smart liquidity orchestration, and high-fidelity transaction execution.
        </p>
      </motion.section>

      <StatsGrid />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <IntentEngine
          intentText={intentText}
          onIntentChange={setIntentText}
          onBuildIntent={handleBuildIntent}
          onRunDemo={handleRunDemo}
          building={building}
        />
        <ActivityTimeline />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <PtbPreviewPanel previewData={previewData} lastExecution={lastExecution} />
        <GuardianPanel />
      </div>

      <TvlChart />

      <div className="grid items-stretch gap-6 xl:grid-cols-[1fr_1fr]">
        <PortfolioPanel />
        <ObjectVisualizer />
      </div>

      <div className="grid items-start gap-6 2xl:grid-cols-[0.9fr_1.1fr]">
        <ExecutionConsole logs={logs} />
        <UtilityFlowsPanel />
      </div>
    </div>
  );
}

export default OverviewPage;
