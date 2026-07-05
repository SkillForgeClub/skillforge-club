import React from "react";

/** Building blocks — all built on the existing `.skeleton` shimmer class in index.css */
export const SkeletonBlock = ({ className = "" }) => <div className={`skeleton ${className}`} />;

export const StatCardSkeleton = () => (
  <div className="stat-card">
    <div className="flex items-center justify-between">
      <div className="space-y-2 flex-1">
        <SkeletonBlock className="h-3.5 w-24" />
        <SkeletonBlock className="h-8 w-16" />
      </div>
      <SkeletonBlock className="w-12 h-12 rounded-xl" />
    </div>
  </div>
);

export const ListRowSkeleton = () => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-white/5">
    <div className="flex items-center gap-4 flex-1">
      <SkeletonBlock className="w-6 h-6 rounded-full shrink-0" />
      <div className="space-y-2 flex-1">
        <SkeletonBlock className="h-3.5 w-1/3" />
        <SkeletonBlock className="h-3 w-1/4" />
      </div>
    </div>
    <SkeletonBlock className="h-6 w-20 rounded-full" />
  </div>
);

export const PanelSkeleton = ({ rows = 3, title = true }) => (
  <div className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 shadow-xl">
    {title && <SkeletonBlock className="h-5 w-40 mb-6" />}
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <ListRowSkeleton key={i} />
      ))}
    </div>
  </div>
);

/** Full overview-page skeleton mirroring the real dashboard layout */
export const OverviewSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <PanelSkeleton rows={3} />
      </div>
      <div className="space-y-6">
        <PanelSkeleton rows={2} />
        <PanelSkeleton rows={1} title={false} />
      </div>
    </div>
  </div>
);

export const CenteredPanelSkeleton = () => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-[#1c2536]/80 border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl space-y-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <SkeletonBlock className="w-32 h-32 md:w-40 md:h-40 rounded-full shrink-0" />
        <div className="space-y-3 w-full">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-9 w-1/2" />
          <SkeletonBlock className="h-4 w-1/3" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
    </div>
  </div>
);
