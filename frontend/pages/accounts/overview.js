import Layout from '@/components/layout'
import { Line } from 'react-chartjs-2'

export function TrendBadge(props) {
    //Red
    if (props.changePercent < 0) {
        return (
            <div className="inline-flex items-center px-2 py-1 rounded-lg space-x-1 bg-red-300 bg-opacity-50">
                <svg className="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fill-rule="evenodd"
                        d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                <span className="text-sm">{props.changePercent}%</span>
            </div>
        )
    } else if (props.changePercent >= 0 && props.changePercent < 3) {
        //Yelow
        return (
            <div className="inline-flex items-center px-2 py-1 rounded-lg space-x-1 bg-yellow-200 bg-opacity-50">
                <svg className="h-4 w-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                <span className="text-sm">{props.changePercent}%</span>
            </div>
        )
    } else {
        //Green
        return (
            <div className="inline-flex items-center px-2 py-1 rounded-lg space-x-1 bg-green-300 bg-opacity-50">
                <svg className="h-4 w-4 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fill-rule="evenodd"
                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                <span className="text-sm">{props.changePercent}%</span>
            </div>
        )
    }
}

export function SalesLine() {
    const lineData = {
        labels: ['7th', '14th', '21st', '28th'],
        datasets: [
            {
                //label: props.data.currency + " Change (" + props.day_one + "-" + props.day_seven + ")",
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 3,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: [10, 20, 21, 40],
            },
        ],
    }

    var lineOptions = {
        response: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        layout: {
            padding: {
                left: 0,
                right: 8,
            },
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                        color: 'rgba(0, 0, 0, 0)',
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        color: 'rgba(0, 0, 0, 0)',
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            if (value % 10 == 0) {
                                return '£' + value
                            }
                            return ''
                        },
                    },
                },
            ],
        },
    }

    return (
        <div className="mt-2 relative chart-container w-11/12 h-24 ">
            <Line options={lineOptions} data={lineData} />
        </div>
    )
}

export default function AccountOverview() {
    return (
        <Layout title="Account Overview - Billpop" contained>
            <h3 className="mt-6 mb-1 text-lg font-bold">Recent Activity</h3>
            <section className="grid grid-cols-12 gap-3 row-gap-2">
                <div className="w-full col-span-12 md:col-span-8">
                    <div className="px-3 py-1 rounded-lg rounded-b-none shadow border border-gray-300">
                        <div className="grid grid-cols-1 divide-y-2 divide-gray-200">
                            <div className="px-2 py-4 flex justify-between cursor-pointer">
                                <div className="flex items-center">
                                    <img
                                        className="h-16 w-16 shadow mr-3"
                                        src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80"
                                        alt=""
                                    />
                                    <div>
                                        <h5 className="w-12 text-green-800 bg-green-300 bg-opacity-50 rounded-lg py-0.5 px-2 font-semibold text-center">
                                            Sale
                                        </h5>
                                        <p className="w-32 truncate">Cool blue hat that is truncated</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex flex-col items-end mr-3">
                                        <div className="flex items-center space-x-2">
                                            <svg
                                                className="h-5 w-5 text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                            <p className="text-gray-500">12 June 2020 - 21:08</p>
                                        </div>
                                        <p className="text-gray-500">£12.99</p>
                                    </div>
                                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="px-2 py-4 flex justify-between cursor-pointer">
                                <div className="flex items-center">
                                    <img
                                        className="h-16 w-16 shadow mr-3"
                                        src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80"
                                        alt=""
                                    />
                                    <div>
                                        <h5 className="w-12 text-green-800 bg-green-300 bg-opacity-50 rounded-lg py-0.5 px-2 font-semibold text-center">
                                            Sale
                                        </h5>
                                        <p className="w-32 truncate">Cool blue hat that is truncated</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex flex-col items-end mr-3">
                                        <div className="flex items-center space-x-2">
                                            <svg
                                                className="h-5 w-5 text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                            <p className="text-gray-500 text-sm">12 June 2020 - 21:08</p>
                                        </div>
                                        <p className="text-gray-500">£12.99</p>
                                    </div>
                                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="px-2 py-4 flex justify-between cursor-pointer">
                                <div className="flex items-center">
                                    <img
                                        className="h-16 w-16 shadow mr-3"
                                        src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80"
                                        alt=""
                                    />
                                    <div>
                                        <h5 className="w-12 text-green-800 bg-green-300 bg-opacity-50 rounded-lg py-0.5 px-2 font-semibold text-center">
                                            Sale
                                        </h5>
                                        <p className="w-32 truncate">Cool blue hat that is truncated</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex flex-col items-end mr-3">
                                        <div className="flex items-center space-x-2">
                                            <svg
                                                className="h-5 w-5 text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                            <p className="text-gray-500">12 June 2020 - 21:08</p>
                                        </div>
                                        <p className="text-gray-500">£12.99</p>
                                    </div>
                                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-8 flex justify-center items-center bg-gray-100 rounded-lg shadow border border-gray-200 border-t-0 rounded-t-none cursor-pointer hover:bg-gray-200 hover:shadow-lg">
                        <p>View more</p>
                    </div>
                </div>

                <div className="w-full mt-6 md:mt-0 col-span-12 md:col-span-3 md:col-start-10 p-3 flex flex-col items-center rounded-lg shadow border border-gray-300">
                    <h5>Sales This Month</h5>
                    <p className="text-sm text-gray-600">By Week</p>
                    <SalesLine />
                </div>
            </section>
        </Layout>
    )
}
