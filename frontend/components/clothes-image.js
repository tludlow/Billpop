export default function ClothesImages(props) {
    return (
        <div>
            <div className="relative w-full bg-gray-200 cursor-pointer pb-full">
                {/* Hover darkened effect */}
                <div
                    className={`absolute w-full h-full z-10 ${
                        props.sold ? 'opacity-25' : 'opacity-0'
                    } hover:opacity-25 bg-black z-10`}
                ></div>

                {/* Sold text */}
                {props.sold && (
                    <p className="absolute z-10 text-yellow-200 text-xl font-extrabold uppercase inset-x-0 top-5/12 text-center">
                        Sold
                    </p>
                )}

                <img className="absolute w-full h-full" src={props.src} alt="Blue Coat" />
            </div>
            <p className="text-sm font-bold tracking-tight">£{props.cost}</p>
        </div>
    )
}
