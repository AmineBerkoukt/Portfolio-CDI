/** Lightweight loader shown while the 3D canvas chunk or GLB is loading. */
export default function HeroCanvasLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-stage-red/30 border-t-stage-red" />
        <span className="font-mono text-[11px] tracking-wide text-stage-silver">
          Loading something fancy ✨
        </span>
      </div>
    </div>
  );
}
