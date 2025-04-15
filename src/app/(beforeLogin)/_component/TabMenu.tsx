interface TabMenuProps {
  tabs: { id: number; name: string }[];
  selectedTab: number;
  onTabChange: (index: number) => void;
}

export default function TabMenu({
  tabs,
  selectedTab,
  onTabChange,
}: TabMenuProps) {
  return (
    <div className="w-full px-[18px] py-4 tablet:py-8 tablet:px-8 flex justify-between">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className="relative min-w-[35px] tablet:min-w-[45px] text-center cursor-pointer"
          onClick={() => onTabChange(index)}
        >
          <span className="text-[15.4px] tablet:text-[17.4px] text-[#737373] font-bold">
            {tab.name}
          </span>
          {selectedTab === index && (
            <div className="absolute -bottom-[5px] tablet:-bottom-[7px] min-w-[35px] w-full h-[5px] bg-brand rounded-xl"></div>
          )}
        </div>
      ))}
    </div>
  );
}
