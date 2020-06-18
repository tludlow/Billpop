import Layout from '@/components/layout'
import ClothesImage from '@/components/clothes-image'

export default function Search() {
    return (
        <Layout title="Search - Billpop" contained>
            <form className="mt-6 w-full" action="">
                <input
                    className="w-full border-b border-gray-300 placeholder-gray-300 text-5xl font-bold focus:outline-none focus:border-gray-600"
                    type="text"
                    placeholder="Search"
                />
            </form>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <ClothesImage
                    src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg"
                    cost={Math.floor(Math.random() * (1000 - 100) + 100) / 100}
                />
                <ClothesImage
                    src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg"
                    cost={Math.floor(Math.random() * (1000 - 100) + 100) / 100}
                />
                <ClothesImage
                    src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg"
                    cost={Math.floor(Math.random() * (1000 - 100) + 100) / 100}
                    sold={true}
                />
                <ClothesImage
                    src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg"
                    cost={Math.floor(Math.random() * (1000 - 100) + 100) / 100}
                />

                <ClothesImage
                    src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg"
                    cost={Math.floor(Math.random() * (1000 - 100) + 100) / 100}
                    sold={true}
                />
                <ClothesImage
                    src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg"
                    cost={Math.floor(Math.random() * (1000 - 100) + 100) / 100}
                />
            </div>
        </Layout>
    )
}
