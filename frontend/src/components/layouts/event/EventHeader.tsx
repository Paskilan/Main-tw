

interface EventHeaderProps {
    imgSrc: string;
}

export const EventHeader: React.FC<EventHeaderProps> = ({
    imgSrc
}) => {
    return (
        <div className="relative">
            <img
                src={imgSrc}
                alt="Event header"
                className="w-full h-56 object-cover rounded-lg shadow-md"
            />
        </div>
    )
}
