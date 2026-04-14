const Card = ({
    cardHeader = null,
    cardBody = null,
    cardFooter = null,
}) => {
    return (
        <div className="
            w-72 
            shrink-0 
            flex flex-col 
            rounded-3 
            shadow-sm 
            bg-white 
            text-gray-900
        ">
            {cardHeader}
            {cardBody}
            {cardFooter}
        </div>
    )
}

export default Card;