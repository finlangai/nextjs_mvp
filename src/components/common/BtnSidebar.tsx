interface BtnSidebarProps {
    class_icon: string;
    active: boolean; 
}

export default function BtnSidebar(
    { class_icon, active}: BtnSidebarProps
) 
{
    return (
        <button 
        className={`
            flex items-center justify-center h-14 w-full
            ${active ? 'border-fintown-pr9 border-l-4' : 'hover:bg-fintown-hvr-btn-1 hover:dark:bg-fintown-hvr-btn-1-light'}
        `}>
            <i className={`
                ${class_icon} text-2xl 
                ${active ? 'text-fintown-pr9' : 'text-fintown-txt-2'}`}></i>
        </button>
    )
}