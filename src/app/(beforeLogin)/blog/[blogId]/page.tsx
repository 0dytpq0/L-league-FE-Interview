import DetailForm from "../_component/DetailForm";

interface Props {
  params: { blogId: string; isCreated: string };
}

export default async function Detail({ params }: Props) {
  const { blogId, isCreated } = params;
  // 401 에러
  // await fetch(`${process.env.API_URL}/api/v1/blog/${blogId}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   cache: "no-store",
  // }).then((res) => console.log("res", res));
  return <DetailForm blogId={Number(blogId)} isCreated={isCreated} />;
}
