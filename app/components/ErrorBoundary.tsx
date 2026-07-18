"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
};

type State = { error: Error | null };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Surface the full error to the console for easier debugging.
    console.error("[Hero3DCanvas] runtime error:", error, info);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (error) {
      if (this.props.fallback) return this.props.fallback(error, this.reset);
      return (
        <div className="flex h-full w-full items-center justify-center p-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="font-condensed text-sm uppercase tracking-widest text-stage-red-glow">
              3D scene failed to load
            </span>
            <span className="font-mono text-[11px] text-stage-silver/80">
              {error.message}
            </span>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
