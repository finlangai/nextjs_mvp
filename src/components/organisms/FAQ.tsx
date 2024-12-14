import { useState } from "react";

interface QuestionProps {
  number: string;
  title: string;
  content: string;
}

const FAQ = ({ number, title, content }: QuestionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="flex gap-3">
      <div className="Frame427322061 w-[30px] h-[30px] pt-2 pb-[7px] rounded border border-fintown-br dark:border-fintown-br-light justify-center items-center inline-flex">
        <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-xs font-medium">
          {number}
        </div>
      </div>
      <div>
        <div className="text-fintown-txt-1 dark:text-fintown-txt-1-light text-base font-semibold mb-[10px]">
          {title}
        </div>
        {isOpen && (
          <div className="w-[730px] text-[#848e9c] text-sm font-medium">
            {content}
          </div>
        )}
      </div>
      <i
        className={`bx ${
          isOpen ? "bx-minus" : "bx-plus"
        } text-fintown-txt-1 dark:text-fintown-txt-1-light text-[30px] ml-auto cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      ></i>
    </div>
  );
};

export default FAQ;
