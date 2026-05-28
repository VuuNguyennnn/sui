import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';

const OverviewPage = lazy(() => import('./pages/OverviewPage'));
const PoolsPage = lazy(() => import('./pages/PoolsPage'));
const SwapPage = lazy(() => import('./pages/SwapPage'));
const FlowStudioPage = lazy(() => import('./pages/FlowStudioPage'));
const MarketsPage = lazy(() => import('./pages/MarketsPage'));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#010a15] text-sm uppercase tracking-[0.28em] text-[#9fd4ff]">
          Loading Sui Dashboard...
        </div>
      }
    >
       <Routes>
         <Route path="/" element={<DashboardLayout />}>
           <Route index element={<Navigate to="/overview" replace />} />
           <Route path="overview" element={<OverviewPage />} />
           <Route path="pools" element={<PoolsPage />} />
           <Route path="swap" element={<SwapPage />} />
           <Route path="flow-studio" element={<FlowStudioPage />} />
           <Route path="markets" element={<MarketsPage />} />
         </Route>
       </Routes>
    </Suspense>
  );
}

export default App;
