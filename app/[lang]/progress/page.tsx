import { PageHeader } from "@/components/page-header";
import { StreakCalendar } from "@/components/streak-calendar";
import { TodayCard } from "@/components/today-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Progress · Study English" };

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Progress"
        description="Keep your streak going — tap any day to mark it studied."
      />
      <TodayCard />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Study calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <StreakCalendar />
        </CardContent>
      </Card>
    </div>
  );
}
