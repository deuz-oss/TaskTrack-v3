import { ObjectDetailPage } from "@/modules/pages/ObjectDetailPage";

export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ObjectDetailPage type="meeting" id={id} basePath="/meetings" />;
}
