"use server";
import DetailForm from "../_component/DetailForm";
import { QUERY_KEYS } from "@/constants/queryKeys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata, ResolvingMetadata } from "next";
import { getBlogDetail } from "@/services/getBlogDetail";

interface Props {
  params: { blogId: string; isCreated: string };
}

// 동적 메타데이터 생성
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { blogId } = await params;

  // 부모 메타데이터 가져오기
  const previousImages = (await parent).openGraph?.images || [];

  // 블로그 데이터 가져오기
  const blog = await getBlogDetail(blogId);

  if (!blog) {
    return {
      title: "블로그 글을 찾을 수 없습니다",
      description: "요청하신 블로그 글을 찾을 수 없습니다.",
    };
  }

  // 설명 텍스트 생성 (내용의 첫 100자)
  const description =
    blog.content?.substring(0, 100) + (blog.content?.length > 100 ? "..." : "");

  return {
    title: blog.title,
    description,
    openGraph: {
      title: blog.title,
      description,
      type: "article",
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at,
      authors: ["L-League"],
      images: blog.main_image
        ? [
            {
              url: blog.main_image,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
            ...previousImages,
          ]
        : previousImages,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: blog.main_image ? [blog.main_image] : [],
    },
  };
}

export default async function Detail({ params }: Props) {
  const queryClient = new QueryClient();
  const { blogId, isCreated } = await params;
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.BLOG_DETAIL, blogId],
    queryFn: () => getBlogDetail(blogId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DetailForm blogId={blogId} isCreated={isCreated} />
    </HydrationBoundary>
  );
}
