import Layout from '@/components/layout'

export default function Sell() {
    return (
        <Layout title="Sell - Billpop">
            <div className="mt-5 grid grid-cols-6">
                {/* Aspect ratio image, where the height is 100% of the width */}
                <div className="relative bg-gray-400 pb-full">
                    <img
                        className="absolute h-full w-full "
                        src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg"
                        alt=""
                    />
                </div>
            </div>
        </Layout>
    )
}
