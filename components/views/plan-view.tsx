"use client";

import { CheckCircle2, Circle } from "lucide-react";

import type { Lang, StudyPlan } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHydrated, useProgressStore } from "@/lib/store/progress";
import { cn } from "@/lib/utils";

export function PlanView({ plan, lang }: { plan: StudyPlan; lang: Lang }) {
  const hydrated = useHydrated();
  const completed = useProgressStore((s) => s.completedPlanSteps);
  const toggle = useProgressStore((s) => s.togglePlanStep);

  const key = (stepId: string) => `${lang}:${stepId}`;
  const isDone = (stepId: string) => hydrated && completed.includes(key(stepId));

  const allSteps = plan.stages.flatMap((st) => st.steps);
  const doneCount = hydrated
    ? allSteps.filter((s) => completed.includes(key(s.id))).length
    : 0;
  const pct = allSteps.length
    ? Math.round((doneCount / allSteps.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Overall progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{plan.intro}</span>
          <span className="font-medium">
            {doneCount}/{allSteps.length}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {plan.stages.map((stage, i) => {
        const stageDone = stage.steps.filter((s) => isDone(s.id)).length;
        return (
          <Card key={stage.id}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">
                  {i + 1}. {stage.title}
                </CardTitle>
                <span className="text-xs text-muted-foreground">
                  {stageDone}/{stage.steps.length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{stage.goal}</p>
            </CardHeader>
            <CardContent className="space-y-1">
              {stage.steps.map((step) => {
                const done = isDone(step.id);
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => toggle(key(step.id))}
                    disabled={!hydrated}
                    className="flex w-full items-start gap-3 rounded-md p-2 text-left transition-colors hover:bg-accent"
                  >
                    {done ? (
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
                    ) : (
                      <Circle className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                    )}
                    <span>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          done && "text-muted-foreground line-through",
                        )}
                      >
                        {step.title}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {step.detail}
                      </span>
                    </span>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
