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
            ${active ? 'border-fintown-btn-active-2 border-l-4' : 'text-fintown-btn-disable hover:bg-fintown-hvr-btn-1'}
        `}>
            <i className={`
                ${class_icon} text-2xl 
                ${active ? 'text-fintown-btn-active-2' : 'text-fintown-btn-disable'}`}></i>
        </button>
    )
}