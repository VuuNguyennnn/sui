function ToastViewport({ toasts }) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto rounded-2xl border border-white/10 bg-[#020b14]/96 p-4 text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
        >
          <p className="font-medium text-[#dff3ff]">{toast.title}</p>
          <p className="mt-1 text-white/65">{toast.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ToastViewport;
