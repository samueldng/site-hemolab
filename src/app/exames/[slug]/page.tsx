import { EXAMS } from "@/data/exams";
import ExamDetailClient from "./ExamDetailClient";

export function generateStaticParams() {
  return EXAMS.map((exam) => ({
    slug: exam.slug,
  }));
}

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ExamDetailClient slug={slug} />;
}
