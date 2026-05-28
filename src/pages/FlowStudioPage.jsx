import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, GripVertical, PlayCircle, Plus, RotateCcw, Trash2 } from 'lucide-react';

const blockCatalog = [
  {
    id: 'pay',
    label: 'Pay',
    description: 'Move capital into the flow from treasury or user wallet.',
    command: 'tx.transferObjects([paymentCoin], treasuryObject)',
    glow: 'shadow-[0_0_18px_rgba(76,162,255,0.18)] border-[#4ca2ff]/20',
  },
  {
    id: 'swap',
    label: 'Swap',
    description: 'Execute best-route asset conversion with slippage limits.',
    command: 'tx.moveCall({ target: "deepbook::swap" })',
    glow: 'shadow-[0_0_18px_rgba(56,182,255,0.2)] border-[#38b6ff]/20',
  },
  {
    id: 'split',
    label: 'Split',
    description: 'Split liquidity across multiple allocations or recipients.',
    command: 'tx.splitCoins(coin, [tx.pure(amountA), tx.pure(amountB)])',
    glow: 'shadow-[0_0_18px_rgba(244,63,94,0.18)] border-[#f43f5e]/20',
  },
  {
    id: 'deposit',
    label: 'Deposit',
    description: 'Allocate routed funds into a vault or capital strategy.',
    command: 'tx.moveCall({ target: "vault::deposit" })',
    glow: 'shadow-[0_0_18px_rgba(34,197,94,0.18)] border-emerald-400/20',
  },
  {
    id: 'lock',
    label: 'Lock',
    description: 'Commit funds into escrow or policy-bound custody.',
    command: 'tx.moveCall({ target: "escrow::lock" })',
    glow: 'shadow-[0_0_18px_rgba(245,158,11,0.20)] border-amber-400/20',
  },
  {
    id: 'release',
    label: 'Release',
    description: 'Finalize and release assets to destination accounts.',
    command: 'tx.moveCall({ target: "escrow::release" })',
    glow: 'shadow-[0_0_18px_rgba(168,85,247,0.20)] border-violet-400/20',
  },
];

function FlowStudioPage() {
  const [flow, setFlow] = useState([
    { uid: 'step-1', blockId: 'pay', status: 'idle' },
    { uid: 'step-2', blockId: 'swap', status: 'idle' },
    { uid: 'step-3', blockId: 'deposit', status: 'idle' },
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [consoleLines, setConsoleLines] = useState([
    '[boot] Flow Studio ready.',
    '[hint] Add blocks from the catalog to build an atomic PTB flow.',
  ]);
  const [draggingBlockId, setDraggingBlockId] = useState(null);
  const [draggingFlowUid, setDraggingFlowUid] = useState(null);
  const [graphIsOver, setGraphIsOver] = useState(false);
  const consoleRef = useRef(null);

  const catalogMap = useMemo(() => {
    return Object.fromEntries(blockCatalog.map((block) => [block.id, block]));
  }, []);

  const addConsoleLog = (message) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    setConsoleLines((current) => [...current.slice(-11), `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleLines]);

  const addBlock = (blockId) => {
    const block = catalogMap[blockId];
    const next = {
      uid: `${blockId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      blockId,
      status: 'idle',
    };
    setFlow((current) => [...current, next]);
    addConsoleLog(`Added ${block.label} block to PTB graph.`);
  };

  const removeBlock = (uid) => {
    setFlow((current) => current.filter((item) => item.uid !== uid));
    addConsoleLog(`Removed block ${uid}.`);
  };

  const reorderFlow = (fromUid, toUid) => {
    if (!fromUid || !toUid || fromUid === toUid) return;

    setFlow((current) => {
      const fromIndex = current.findIndex((item) => item.uid === fromUid);
      const toIndex = current.findIndex((item) => item.uid === toUid);
      if (fromIndex === -1 || toIndex === -1) return current;

      const next = [...current];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });

    addConsoleLog(`Reordered flow node ${fromUid} before ${toUid}.`);
  };

  const resetFlow = () => {
    setFlow([
      { uid: 'step-1', blockId: 'pay', status: 'idle' },
      { uid: 'step-2', blockId: 'swap', status: 'idle' },
      { uid: 'step-3', blockId: 'deposit', status: 'idle' },
    ]);
    setConsoleLines([
      '[boot] Flow Studio reset.',
      '[hint] Add blocks from the catalog to build an atomic PTB flow.',
    ]);
  };

  const simulateFlow = async () => {
    if (!flow.length || isSimulating) return;

    setIsSimulating(true);
    addConsoleLog('Starting PTB flow simulation...');

    for (const step of flow) {
      const block = catalogMap[step.blockId];

      setFlow((current) =>
        current.map((item) =>
          item.uid === step.uid
            ? { ...item, status: 'executing' }
            : item.status === 'executing'
              ? { ...item, status: 'success' }
              : item,
        ),
      );

      addConsoleLog(`Executing ${block.label} ...`);
      addConsoleLog(block.command);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 520));

      setFlow((current) => current.map((item) => (item.uid === step.uid ? { ...item, status: 'success' } : item)));
      addConsoleLog(`${block.label} settled atomically.`);
    }

    addConsoleLog('Flow simulation finished successfully.');
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6">
      <section className="glass-panel neon-outline rounded-[2rem] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-[#9fd4ff]">Flow Studio</p>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Programmable Transaction Builder</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65 md:text-base">
          Assemble a financial flow block by block, visualize atomic execution order, and preview
          mocked Sui PTB commands in a developer-grade runtime console.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-panel rounded-[1.75rem] p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-white">Available Blocks</p>
            <button
              type="button"
              onClick={resetFlow}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/75 transition hover:bg-white/10"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>

          <div className="mt-5 grid gap-3">
            {blockCatalog.map((block, index) => (
              <motion.button
                key={block.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.05 }}
                onClick={() => addBlock(block.id)}
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData('application/flow-block', block.id);
                  event.dataTransfer.effectAllowed = 'copy';
                  setDraggingBlockId(block.id);
                }}
                onDragEnd={() => setDraggingBlockId(null)}
                className={`rounded-2xl border bg-[#07121d]/70 px-4 py-4 text-left text-white transition hover:bg-[#0a1622] ${block.glow}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-3 text-sm font-medium text-white">
                      <GripVertical className="h-4 w-4 shrink-0 text-[#9fd4ff]" />
                      {block.label}
                    </span>
                    <p className="mt-2 text-sm leading-6 text-white/58">{block.description}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.16em] text-[#dff3ff]">
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.08 }}
          className="glass-panel neon-outline rounded-[1.75rem] p-6"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-white">Current Flow Graph</p>
              <p className="mt-1 text-sm leading-6 text-white/55">
                Blocks wrap responsively and simulate as a single atomic PTB path.
              </p>
            </div>

            <button
              type="button"
              onClick={simulateFlow}
              disabled={isSimulating || flow.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#4ca2ff]/30 bg-[#4ca2ff]/10 px-4 py-2 text-sm text-[#dff3ff] transition hover:bg-[#4ca2ff]/18 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <PlayCircle className="h-4 w-4" />
              {isSimulating ? 'Simulating...' : 'Simulate Flow'}
            </button>
          </div>

          <div
            className={`mt-6 flex min-h-[10rem] flex-wrap gap-3 rounded-[1.4rem] border border-dashed p-3 transition ${graphIsOver ? 'border-[#4ca2ff]/40 bg-[#4ca2ff]/6' : 'border-white/10 bg-transparent'}`}
            onDragOver={(event) => {
              event.preventDefault();
              setGraphIsOver(true);
            }}
            onDragLeave={() => setGraphIsOver(false)}
            onDrop={(event) => {
              event.preventDefault();
              const blockId = event.dataTransfer.getData('application/flow-block');
              if (blockId) {
                addBlock(blockId);
              }
              setDraggingBlockId(null);
              setDraggingFlowUid(null);
              setGraphIsOver(false);
            }}
          >
            {flow.map((step, index) => {
              const block = catalogMap[step.blockId];
              const isExecuting = step.status === 'executing';
              const isSuccess = step.status === 'success';

              return (
                <motion.div
                  key={step.uid}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: isExecuting ? 1.05 : 1,
                    boxShadow: isExecuting
                      ? '0 0 20px rgba(56,182,255,0.32)'
                      : isSuccess
                        ? '0 0 0 rgba(0,0,0,0)'
                        : '0 0 0 rgba(0,0,0,0)',
                  }}
                  transition={{ duration: 0.22 }}
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData('application/flow-node', step.uid);
                    event.dataTransfer.effectAllowed = 'move';
                    setDraggingFlowUid(step.uid);
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    const fromUid = event.dataTransfer.getData('application/flow-node');
                    if (fromUid) {
                      reorderFlow(fromUid, step.uid);
                    }
                    setDraggingFlowUid(null);
                    setGraphIsOver(false);
                  }}
                  onDragEnd={() => {
                    setDraggingFlowUid(null);
                    setGraphIsOver(false);
                  }}
                  className={`min-w-[180px] max-w-full flex-1 rounded-2xl border border-white/10 bg-[#07121d]/78 px-4 py-4 text-sm text-white ${draggingFlowUid === step.uid ? 'opacity-65 ring-1 ring-[#4ca2ff]/30' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-xs uppercase tracking-[0.18em] text-white/40">Node {index + 1}</p>
                      <p className="mt-1 break-words font-medium text-white">{block.label}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeBlock(step.uid)}
                      className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/65 transition hover:bg-white/10 hover:text-white"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="mt-3 break-words text-sm leading-6 text-white/55">{block.description}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {index < flow.length - 1 && (
                      <span className="rounded-full border border-[#38b6ff]/25 bg-[#38b6ff]/8 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#9fd4ff]">
                        {'~ ~ ~'} Signal Path
                      </span>
                    )}
                    {isExecuting && (
                      <span className="rounded-full border border-[#38b6ff]/25 bg-[#38b6ff]/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#dff3ff]">
                        Executing...
                      </span>
                    )}
                    {isSuccess && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-emerald-300">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Success (Atomic)
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {!flow.length && (
              <div className="flex w-full items-center justify-center rounded-2xl border border-white/10 bg-[#07121d]/60 px-4 py-8 text-sm text-white/45">
                {draggingBlockId ? 'Drop block here to append it to the PTB flow.' : 'Add or drag a block here to build a programmable transaction.'}
              </div>
            )}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#07121d]/70 p-4 text-sm leading-7 text-white/62">
            This studio demonstrates how Sui PTBs can bundle payment, swap, allocation, split,
            lock, and release logic into one atomic execution path without forcing the user to sign
            each step separately.
          </div>

          <div
            ref={consoleRef}
            className="mt-6 max-h-72 overflow-y-auto rounded-[1.5rem] border border-white/10 bg-[#050c16]/90 p-4 text-left font-mono text-sm text-white/72"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[#9fd4ff]">PTB Command Console</p>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/50">
                mocked runtime
              </span>
            </div>
            <div className="space-y-2 break-words text-left text-white/68">
              {consoleLines.map((line, index) => (
                <p key={`${line}-${index}`} className="leading-6">{line}</p>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default FlowStudioPage;
