export default function ClothesImages(props) {
    return (
        <div>
            {/* Have the pb-full on this so the image will be a fixed aspect ratio dependent on the grid width */}
            <div className="relative pb-full bg-gray-200 cursor-pointer">
                {/* Hover darkened effect */}
                <div
                    className={`absolute w-full h-full ${
                        props.sold ? 'opacity-25' : 'opacity-0'
                    } hover:opacity-25 bg-black z-10`}
                ></div>

                {/* Sold text */}
                {props.sold && (
                    <p className="absolute text-yellow-200 text-xl font-extrabold uppercase inset-x-0 my-auto z-10 top-5/12 text-center">
                        Sold
                    </p>
                )}

                <img className="absolute w-full h-full" src={props.src} alt="Blue Coat" />
            </div>
            <p className="text-sm font-bold tracking-tight">£{props.cost}</p>
        </div>
    )
}
