"use client";
import { useCategories } from "@/hooks/useBlog";
import { useSearchParams } from "next/navigation";

export default function TabMenu() {
  const searchParams = useSearchParams();
  const selectedTab = Number(searchParams.get("tab") || 0);
  const { data: tabs, isLoading } = useCategories({
    page: 1,
    page_size: 10,
  });
  const handleTabChange = (selectedTabId: number) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", selectedTabId.toString());
    window.history.pushState(null, "", newUrl.toString());
  };

  if (isLoading) {
    return (
      <div className="w-full px-[18px] py-4 tablet:py-8 tablet:px-8 flex justify-between"></div>
    );
  }

  return (
    <div className="w-full px-[18px] py-4 tablet:py-8 tablet:px-8 flex justify-between">
      {tabs?.map((tab, index) => (
        <div
          key={index}
          className="relative min-w-[35px] tablet:min-w-[45px] text-center cursor-pointer"
          onClick={() => handleTabChange(index)}
        >
          <span className="text-[15.4px] tablet:text-[17.4px] text-[#737373] font-bold">
            {tab.name}
          </span>
          {Number(selectedTab) === tab.id && (
            <div className="absolute -bottom-[5px] tablet:-bottom-[7px] min-w-[35px] w-full h-[5px] bg-brand rounded-xl"></div>
          )}
        </div>
      ))}
    </div>
  );
}
