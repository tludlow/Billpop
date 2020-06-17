export default function ClothesImages(props) {
    return (
        <div>
            <div className="relative w-full h-48 bg-gray-200 cursor-pointer">
                {/* Hover darkened effect */}
                <div
                    className={`absolute w-full h-full ${
                        props.sold ? 'opacity-25' : 'opacity-0'
                    } hover:opacity-25 bg-black`}
                ></div>

                {/* Sold text */}
                {props.sold && (
                    <p className="absolute text-yellow-200 text-xl font-extrabold uppercase inset-x-0 top-19 text-center">
                        Sold
                    </p>
                )}

                <img className="w-full h-full" src={props.src} alt="Blue Coat" />
            </div>
            <p className="text-sm font-bold tracking-tight">£{props.cost}</p>
        </div>
    )
}
