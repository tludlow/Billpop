import Nav from '@/components/nav'
import Head from 'next/head'
import Footer from '@/components/footer'

import { useState } from 'react'

export default function Index() {
    const [randomImage] = useState(Math.round(Math.random()))

    return (
        <div className="">
            <Head>
                <title>Billpop</title>
            </Head>
            <Nav />
            {/* Hero */}
            <div
                id="hero"
                className="w-full bg-cover bg-center"
                style={{
                    backgroundColor: '#7786D7',
                    backgroundImage: `url('https://d3170a3msf25m.cloudfront.net/assets/narrative/hero@2x.jpg')`,
                    height: '477px',
                }}
            >
                <div className="h-full container mx-auto grid grid-cols-2">
                    <div className="pl-4 md:pl-0 w-full py-16 space-y-4 my-auto">
                        <h1 className="font-black text-4xl leading-tight">
                            BUY. SELL. <br />
                            DISCOVER UNIQUE FASHION.
                        </h1>

                        <p>
                            Designer. Preloved. Vintage. Streetwear. Sneakers. <br /> Whatever your style. Find it on
                            Depop.
                        </p>

                        <div className="flex space-x-3 ">
                            <svg
                                className="cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                width="120"
                                height="40"
                                viewBox="0 0 120 40"
                            >
                                <title>Download Depop on the App Store</title>
                                <g fill="none" fillRule="nonzero">
                                    <path
                                        fill="#A6A6A6"
                                        d="M110.135 0H9.535c-.367 0-.73 0-1.095.002-.306.002-.61.008-.919.013C6.85.023 6.18.082 5.517.19a6.665 6.665 0 0 0-1.9.627A6.438 6.438 0 0 0 .193 5.521a12.993 12.993 0 0 0-.179 2.002c-.01.307-.01.615-.015.921V31.56c.005.31.006.61.015.921.008.671.068 1.34.18 2.002.11.663.32 1.306.624 1.905.303.598.701 1.143 1.179 1.614.473.477 1.02.875 1.618 1.179a6.7 6.7 0 0 0 1.901.63c.663.11 1.333.168 2.004.177.31.007.613.011.919.011.366.002.728.002 1.095.002h100.6c.36 0 .724 0 1.084-.002.304 0 .617-.004.922-.01.67-.01 1.338-.068 2-.178a6.804 6.804 0 0 0 1.908-.63A6.277 6.277 0 0 0 117.666 38a6.395 6.395 0 0 0 1.182-1.614c.302-.6.51-1.242.619-1.905.111-.661.173-1.33.185-2.002.004-.31.004-.61.004-.921.008-.364.008-.725.008-1.094V9.536c0-.366 0-.73-.008-1.092 0-.306 0-.614-.004-.92a13.507 13.507 0 0 0-.185-2.003 6.618 6.618 0 0 0-.62-1.903 6.466 6.466 0 0 0-2.798-2.8 6.768 6.768 0 0 0-1.908-.627c-.661-.11-1.33-.169-2-.176-.305-.005-.618-.011-.922-.013-.36-.002-.725-.002-1.084-.002z"
                                    ></path>
                                    <path
                                        fill="#000"
                                        d="M8.445 39.125c-.305 0-.602-.004-.904-.01a12.687 12.687 0 0 1-1.87-.164 5.884 5.884 0 0 1-1.656-.548 5.406 5.406 0 0 1-1.397-1.016 5.32 5.32 0 0 1-1.02-1.397 5.722 5.722 0 0 1-.544-1.657 12.414 12.414 0 0 1-.166-1.875c-.007-.21-.015-.913-.015-.913v-23.1s.009-.692.015-.895a12.37 12.37 0 0 1 .165-1.872 5.755 5.755 0 0 1 .544-1.662c.26-.518.603-.99 1.015-1.398A5.565 5.565 0 0 1 5.667 1.05C6.287.95 6.915.895 7.543.887l.902-.012h102.769l.913.013c.623.007 1.244.061 1.858.162a5.938 5.938 0 0 1 1.671.548 5.594 5.594 0 0 1 2.415 2.42c.26.52.441 1.076.535 1.649.104.624.162 1.255.174 1.887.003.283.003.588.003.89.008.375.008.732.008 1.092v20.929c0 .363 0 .718-.008 1.075 0 .325 0 .623-.004.93-.011.62-.069 1.24-.17 1.853a5.739 5.739 0 0 1-.54 1.67 5.48 5.48 0 0 1-1.016 1.386 5.413 5.413 0 0 1-1.4 1.022 5.862 5.862 0 0 1-1.668.55c-.618.101-1.243.156-1.869.163-.293.007-.6.011-.897.011l-1.084.002-101.69-.002z"
                                    ></path>
                                    <g fill="#FFF">
                                        <path d="M24.769 20.3a4.949 4.949 0 0 1 2.356-4.151 5.066 5.066 0 0 0-3.99-2.158c-1.68-.176-3.308 1.005-4.164 1.005-.872 0-2.19-.988-3.608-.958a5.315 5.315 0 0 0-4.473 2.728c-1.934 3.348-.491 8.269 1.361 10.976.927 1.325 2.01 2.805 3.428 2.753 1.387-.058 1.905-.885 3.58-.885 1.658 0 2.144.885 3.59.852 1.489-.025 2.426-1.332 3.32-2.67a10.962 10.962 0 0 0 1.52-3.092 4.782 4.782 0 0 1-2.92-4.4zM22.037 12.21a4.872 4.872 0 0 0 1.115-3.49 4.957 4.957 0 0 0-3.208 1.66A4.636 4.636 0 0 0 18.8 13.74a4.1 4.1 0 0 0 3.237-1.53z"></path>
                                        <g>
                                            <path d="M42.302 27.14H37.57l-1.137 3.356h-2.005l4.484-12.418h2.083l4.483 12.418h-2.039l-1.136-3.356zm-4.243-1.55h3.752l-1.85-5.446h-.051l-1.85 5.447zM55.16 25.97c0 2.813-1.506 4.62-3.779 4.62a3.07 3.07 0 0 1-2.848-1.583h-.043v4.484H46.63V21.442h1.8v1.506h.033a3.212 3.212 0 0 1 2.883-1.6c2.298 0 3.813 1.816 3.813 4.622zm-1.91 0c0-1.833-.948-3.038-2.393-3.038-1.42 0-2.375 1.23-2.375 3.038 0 1.824.955 3.046 2.375 3.046 1.445 0 2.393-1.197 2.393-3.046zM65.125 25.97c0 2.813-1.506 4.62-3.779 4.62a3.07 3.07 0 0 1-2.848-1.583h-.043v4.484h-1.859V21.442h1.799v1.506h.034a3.212 3.212 0 0 1 2.883-1.6c2.298 0 3.813 1.816 3.813 4.622zm-1.91 0c0-1.833-.948-3.038-2.393-3.038-1.42 0-2.375 1.23-2.375 3.038 0 1.824.955 3.046 2.375 3.046 1.445 0 2.392-1.197 2.392-3.046zM71.71 27.036c.138 1.232 1.334 2.04 2.97 2.04 1.566 0 2.693-.808 2.693-1.919 0-.964-.68-1.54-2.29-1.936l-1.609-.388c-2.28-.55-3.339-1.617-3.339-3.348 0-2.142 1.867-3.614 4.519-3.614 2.624 0 4.423 1.472 4.483 3.614h-1.876c-.112-1.239-1.136-1.987-2.634-1.987-1.497 0-2.521.757-2.521 1.858 0 .878.654 1.395 2.255 1.79l1.368.336c2.548.603 3.606 1.626 3.606 3.443 0 2.323-1.85 3.778-4.793 3.778-2.754 0-4.614-1.42-4.734-3.667h1.902zM83.346 19.3v2.142h1.722v1.472h-1.722v4.991c0 .776.345 1.137 1.102 1.137.204-.004.408-.018.611-.043v1.463c-.34.063-.686.092-1.032.086-1.833 0-2.548-.689-2.548-2.445v-5.189h-1.316v-1.472h1.316V19.3h1.867zM86.065 25.97c0-2.849 1.678-4.639 4.294-4.639 2.625 0 4.295 1.79 4.295 4.639 0 2.856-1.661 4.638-4.295 4.638-2.633 0-4.294-1.782-4.294-4.638zm6.695 0c0-1.954-.895-3.108-2.401-3.108-1.506 0-2.4 1.162-2.4 3.108 0 1.962.894 3.106 2.4 3.106 1.506 0 2.401-1.144 2.401-3.106zM96.186 21.442h1.773v1.541h.043a2.16 2.16 0 0 1 2.177-1.635c.214-.001.428.022.637.069v1.738a2.598 2.598 0 0 0-.835-.112 1.873 1.873 0 0 0-1.937 2.083v5.37h-1.858v-9.054zM109.384 27.837c-.25 1.643-1.85 2.771-3.898 2.771-2.634 0-4.269-1.764-4.269-4.595 0-2.84 1.644-4.682 4.19-4.682 2.506 0 4.08 1.72 4.08 4.466v.637h-6.394v.112a2.358 2.358 0 0 0 2.436 2.564 2.048 2.048 0 0 0 2.09-1.273h1.765zm-6.282-2.702h4.526a2.177 2.177 0 0 0-2.22-2.298 2.292 2.292 0 0 0-2.306 2.298z"></path>
                                        </g>
                                    </g>
                                    <g fill="#FFF">
                                        <path d="M37.826 8.731a2.64 2.64 0 0 1 2.808 2.965c0 1.906-1.03 3.002-2.808 3.002h-2.155V8.73h2.155zm-1.228 5.123h1.125a1.876 1.876 0 0 0 1.967-2.146 1.881 1.881 0 0 0-1.967-2.134h-1.125v4.28zM41.68 12.444a2.133 2.133 0 1 1 4.248 0 2.134 2.134 0 1 1-4.247 0zm3.334 0c0-.976-.439-1.547-1.208-1.547-.773 0-1.207.571-1.207 1.547 0 .984.434 1.55 1.207 1.55.77 0 1.208-.57 1.208-1.55zM51.573 14.698h-.922l-.93-3.317h-.07l-.927 3.317h-.913l-1.242-4.503h.902l.806 3.436h.067l.926-3.436h.852l.926 3.436h.07l.803-3.436h.889zM53.854 10.195h.855v.715h.066c.231-.527.771-.849 1.344-.802a1.465 1.465 0 0 1 1.559 1.675v2.915h-.889v-2.692c0-.724-.314-1.084-.972-1.084a1.033 1.033 0 0 0-1.075 1.141v2.635h-.888v-4.503zM59.094 8.437h.888v6.26h-.888zM61.218 12.444a2.133 2.133 0 1 1 4.247 0 2.134 2.134 0 1 1-4.247 0zm3.333 0c0-.976-.439-1.547-1.208-1.547-.773 0-1.207.571-1.207 1.547 0 .984.434 1.55 1.207 1.55.77 0 1.208-.57 1.208-1.55zM66.4 13.424c0-.81.604-1.278 1.676-1.344l1.22-.07v-.389c0-.475-.315-.744-.922-.744-.497 0-.84.182-.939.5h-.86c.09-.773.818-1.27 1.84-1.27 1.128 0 1.765.563 1.765 1.514v3.077h-.855v-.633h-.07c-.291.462-.808.732-1.353.707a1.36 1.36 0 0 1-1.501-1.348zm2.895-.384v-.377l-1.1.07c-.62.042-.9.253-.9.65 0 .405.351.64.834.64a1.062 1.062 0 0 0 1.166-.983zM71.348 12.444c0-1.423.732-2.324 1.87-2.324a1.484 1.484 0 0 1 1.38.79h.067V8.437h.888v6.26h-.851v-.71h-.07a1.563 1.563 0 0 1-1.415.785c-1.145 0-1.869-.901-1.869-2.328zm.918 0c0 .955.45 1.53 1.203 1.53.75 0 1.212-.583 1.212-1.526 0-.938-.468-1.53-1.212-1.53-.748 0-1.203.58-1.203 1.526zM79.23 12.444a2.133 2.133 0 1 1 4.247 0 2.134 2.134 0 1 1-4.247 0zm3.333 0c0-.976-.438-1.547-1.208-1.547-.772 0-1.207.571-1.207 1.547 0 .984.435 1.55 1.207 1.55.77 0 1.208-.57 1.208-1.55zM84.67 10.195h.855v.715h.066c.231-.527.77-.849 1.344-.802a1.465 1.465 0 0 1 1.559 1.675v2.915h-.889v-2.692c0-.724-.314-1.084-.972-1.084a1.033 1.033 0 0 0-1.075 1.141v2.635h-.889v-4.503zM93.515 9.074v1.141h.976v.749h-.976v2.315c0 .472.195.679.637.679.113 0 .226-.008.339-.021v.74c-.16.029-.322.044-.484.046-.988 0-1.381-.348-1.381-1.216v-2.543h-.715v-.749h.715V9.074h.89zM95.705 8.437h.88v2.481h.07a1.386 1.386 0 0 1 1.374-.806 1.483 1.483 0 0 1 1.55 1.679v2.907h-.889V12.01c0-.72-.335-1.084-.963-1.084a1.052 1.052 0 0 0-1.134 1.142v2.63h-.888V8.437zM104.761 13.482a1.828 1.828 0 0 1-1.95 1.303 2.045 2.045 0 0 1-2.081-2.325 2.077 2.077 0 0 1 2.076-2.352c1.253 0 2.009.856 2.009 2.27v.31h-3.18v.05a1.19 1.19 0 0 0 1.2 1.29 1.08 1.08 0 0 0 1.07-.546h.856zm-3.126-1.451h2.275a1.086 1.086 0 0 0-1.109-1.167 1.152 1.152 0 0 0-1.166 1.167z"></path>
                                    </g>
                                </g>
                            </svg>
                            <svg
                                className="cursor-pointer"
                                viewBox="0 0 135 40"
                                width="135"
                                height="40"
                                xmlns="http://www.w3.org/2000/svg"
                                data-reactid="369"
                            >
                                <title>Download Depop on Google Play</title>
                                <g fill="none" fillRule="evenodd" data-reactid="370">
                                    <path
                                        d="M130 40H5c-2.75 0-5-2.25-5-5V5c0-2.75 2.25-5 5-5h125c2.75 0 5 2.25 5 5v30c0 2.75-2.25 5-5 5"
                                        fill="#000"
                                        data-reactid="371"
                                    ></path>
                                    <path
                                        d="M130 0H5C2.25 0 0 2.25 0 5v30c0 2.75 2.25 5 5 5h125c2.75 0 5-2.25 5-5V5c0-2.75-2.25-5-5-5m0 .8c2.316 0 4.2 1.884 4.2 4.2v30c0 2.316-1.884 4.2-4.2 4.2H5A4.205 4.205 0 0 1 .8 35V5C.8 2.684 2.684.8 5 .8h125"
                                        fill="#A6A6A6"
                                        data-reactid="372"
                                    ></path>
                                    <path
                                        d="M47.419 10.243c0 .838-.248 1.505-.745 2.003-.566.592-1.3.888-2.205.888-.867 0-1.602-.3-2.208-.9-.607-.6-.909-1.346-.909-2.234 0-.889.303-1.633.91-2.234.605-.6 1.34-.9 2.207-.9.43 0 .841.083 1.231.251.392.168.704.391.94.67l-.529.528c-.396-.474-.944-.712-1.642-.712-.632 0-1.178.222-1.639.666-.46.445-.69 1.021-.69 1.731 0 .71.23 1.286.69 1.73a2.278 2.278 0 0 0 1.64.666c.67 0 1.227-.223 1.675-.67.29-.29.457-.695.502-1.215H44.47v-.72h2.907c.029.156.043.307.043.452"
                                        fill="#FFF"
                                        data-reactid="373"
                                    ></path>
                                    <path
                                        d="M47.419 10.243c0 .838-.248 1.505-.745 2.003-.566.592-1.3.888-2.205.888-.867 0-1.602-.3-2.208-.9-.607-.6-.909-1.346-.909-2.234 0-.889.303-1.633.91-2.234.605-.6 1.34-.9 2.207-.9.43 0 .841.083 1.231.251.392.168.704.391.94.67l-.529.528c-.396-.474-.944-.712-1.642-.712-.632 0-1.178.222-1.639.666-.46.445-.69 1.021-.69 1.731 0 .71.23 1.286.69 1.73a2.278 2.278 0 0 0 1.64.666c.67 0 1.227-.223 1.675-.67.29-.29.457-.695.502-1.215H44.47v-.72h2.907c.029.156.043.307.043.452z"
                                        stroke="#FFF"
                                        strokeWidth="0.2"
                                        data-reactid="374"
                                    ></path>
                                    <path
                                        fill="#FFF"
                                        d="M52.028 7.737h-2.732V9.64h2.464v.721h-2.464v1.902h2.732V13h-3.503V7h3.503z"
                                        data-reactid="375"
                                    ></path>
                                    <path
                                        stroke="#FFF"
                                        strokeWidth="0.2"
                                        d="M52.028 7.737h-2.732V9.64h2.464v.721h-2.464v1.902h2.732V13h-3.503V7h3.503z"
                                        data-reactid="376"
                                    ></path>
                                    <path
                                        fill="#FFF"
                                        d="M55.279 13h-.771V7.737h-1.676V7h4.123v.737h-1.676z"
                                        data-reactid="377"
                                    ></path>
                                    <path
                                        stroke="#FFF"
                                        strokeWidth="0.2"
                                        d="M55.279 13h-.771V7.737h-1.676V7h4.123v.737h-1.676z"
                                        data-reactid="378"
                                    ></path>
                                    <path fill="#FFF" d="M59.938 13h.771V7h-.771z" data-reactid="379"></path>
                                    <path
                                        stroke="#FFF"
                                        strokeWidth="0.2"
                                        d="M59.938 13h.771V7h-.771z"
                                        data-reactid="380"
                                    ></path>
                                    <path
                                        fill="#FFF"
                                        d="M64.128 13h-.77V7.737H61.68V7h4.123v.737h-1.676z"
                                        data-reactid="381"
                                    ></path>
                                    <path
                                        stroke="#FFF"
                                        strokeWidth="0.2"
                                        d="M64.128 13h-.77V7.737H61.68V7h4.123v.737h-1.676z"
                                        data-reactid="382"
                                    ></path>
                                    <path
                                        d="M69.78 11.722a2.2 2.2 0 0 0 1.63.674 2.2 2.2 0 0 0 1.63-.674c.443-.45.666-1.024.666-1.722s-.223-1.273-.667-1.722a2.201 2.201 0 0 0-1.63-.675c-.643 0-1.186.225-1.63.675-.443.45-.666 1.024-.666 1.722s.223 1.272.666 1.722m3.83.502c-.59.607-1.323.91-2.2.91-.877 0-1.61-.303-2.199-.91-.59-.606-.884-1.347-.884-2.224 0-.877.294-1.619.884-2.225.59-.606 1.322-.91 2.2-.91.871 0 1.602.305 2.195.914.592.61.888 1.35.888 2.221 0 .877-.295 1.618-.884 2.224"
                                        fill="#FFF"
                                        data-reactid="383"
                                    ></path>
                                    <path
                                        d="M69.78 11.722a2.2 2.2 0 0 0 1.63.674 2.2 2.2 0 0 0 1.63-.674c.443-.45.666-1.024.666-1.722s-.223-1.273-.667-1.722a2.201 2.201 0 0 0-1.63-.675c-.643 0-1.186.225-1.63.675-.443.45-.666 1.024-.666 1.722s.223 1.272.666 1.722zm3.83.502c-.59.607-1.324.91-2.2.91-.878 0-1.61-.303-2.2-.91-.59-.606-.884-1.347-.884-2.224 0-.877.294-1.619.884-2.225.59-.606 1.322-.91 2.2-.91.871 0 1.602.305 2.195.914.592.61.888 1.35.888 2.221 0 .877-.295 1.618-.884 2.224z"
                                        stroke="#FFF"
                                        strokeWidth="0.2"
                                        data-reactid="384"
                                    ></path>
                                    <path
                                        fill="#FFF"
                                        d="M75.575 13V7h.938l2.916 4.667h.034l-.034-1.156V7h.772v6h-.805l-3.05-4.894h-.034l.033 1.157V13z"
                                        data-reactid="385"
                                    ></path>
                                    <path
                                        stroke="#FFF"
                                        strokeWidth="0.2"
                                        d="M75.575 13V7h.938l2.916 4.667h.034l-.034-1.156V7h.772v6h-.805l-3.05-4.894h-.034l.033 1.157V13z"
                                        data-reactid="386"
                                    ></path>
                                    <path
                                        d="M106.936 30h1.866V17.499h-1.866V30zm16.807-7.998l-2.139 5.42h-.064l-2.22-5.42h-2.01l3.329 7.575-1.897 4.214h1.945l5.131-11.789h-2.075zm-10.582 6.578c-.612 0-1.464-.305-1.464-1.062 0-.964 1.061-1.334 1.978-1.334.82 0 1.207.177 1.705.418a2.262 2.262 0 0 1-2.219 1.978zm.225-6.851c-1.351 0-2.751.595-3.329 1.914l1.656.691c.354-.691 1.013-.917 1.705-.917.965 0 1.946.579 1.962 1.609v.128c-.338-.193-1.061-.482-1.946-.482-1.785 0-3.603.981-3.603 2.814 0 1.673 1.464 2.751 3.104 2.751 1.255 0 1.947-.563 2.381-1.223h.064v.965h1.801v-4.793c0-2.219-1.656-3.457-3.795-3.457zm-11.532 1.795H99.2v-4.285h2.654c1.395 0 2.187 1.155 2.187 2.142 0 .969-.792 2.143-2.187 2.143zm-.048-6.025h-4.471V30H99.2v-4.736h2.606c2.068 0 4.101-1.498 4.101-3.883s-2.033-3.882-4.101-3.882zM77.425 28.582c-1.289 0-2.368-1.079-2.368-2.561 0-1.498 1.079-2.594 2.368-2.594 1.273 0 2.271 1.096 2.271 2.594 0 1.482-.998 2.561-2.271 2.561zm2.143-5.88h-.065c-.419-.499-1.224-.95-2.239-.95-2.127 0-4.076 1.868-4.076 4.269 0 2.384 1.949 4.237 4.076 4.237 1.015 0 1.82-.451 2.239-.967h.065v.613c0 1.627-.87 2.497-2.272 2.497-1.144 0-1.853-.822-2.143-1.515l-1.627.677c.467 1.128 1.708 2.513 3.77 2.513 2.191 0 4.044-1.289 4.044-4.43v-7.637h-1.772v.693zM82.629 30h1.869V17.498h-1.869V30zm4.623-4.124c-.048-1.643 1.273-2.481 2.223-2.481.742 0 1.37.37 1.579.902l-3.802 1.579zm5.8-1.418c-.354-.95-1.434-2.706-3.641-2.706-2.191 0-4.011 1.723-4.011 4.253 0 2.384 1.804 4.253 4.22 4.253 1.95 0 3.078-1.192 3.545-1.885l-1.45-.967c-.483.709-1.144 1.176-2.095 1.176-.95 0-1.627-.435-2.062-1.288l5.687-2.353-.193-.483zm-45.308-1.401v1.804h4.317c-.129 1.015-.467 1.756-.982 2.271-.629.629-1.612 1.322-3.335 1.322-2.659 0-4.737-2.143-4.737-4.801 0-2.659 2.078-4.801 4.737-4.801 1.434 0 2.481.564 3.254 1.289l1.273-1.273c-1.08-1.031-2.513-1.821-4.527-1.821-3.641 0-6.702 2.965-6.702 6.606s3.061 6.605 6.702 6.605c1.965 0 3.447-.645 4.607-1.853 1.193-1.192 1.563-2.867 1.563-4.221 0-.419-.032-.805-.097-1.127h-6.073zm11.079 5.525c-1.289 0-2.401-1.063-2.401-2.577 0-1.531 1.112-2.578 2.401-2.578 1.288 0 2.4 1.047 2.4 2.578 0 1.514-1.112 2.577-2.4 2.577zm0-6.83c-2.353 0-4.27 1.788-4.27 4.253 0 2.449 1.917 4.253 4.27 4.253 2.352 0 4.269-1.804 4.269-4.253 0-2.465-1.917-4.253-4.269-4.253zm9.313 6.83c-1.289 0-2.401-1.063-2.401-2.577 0-1.531 1.112-2.578 2.401-2.578 1.289 0 2.4 1.047 2.4 2.578 0 1.514-1.111 2.577-2.4 2.577zm0-6.83c-2.352 0-4.269 1.788-4.269 4.253 0 2.449 1.917 4.253 4.269 4.253 2.352 0 4.269-1.804 4.269-4.253 0-2.465-1.917-4.253-4.269-4.253z"
                                        fill="#FFF"
                                        data-reactid="387"
                                    ></path>
                                    <path
                                        d="M22.899 19.854v.293l4.129 4.132.094-.053 4.893-2.78c1.397-.795 1.397-2.095 0-2.888l-4.893-2.781-.093-.053-4.13 4.13z"
                                        fill="#FFCF00"
                                        data-reactid="388"
                                    ></path>
                                    <path
                                        d="M10.435 32.464c.461.487 1.222.548 2.079.062l14.608-8.301-4.223-4.224-12.464 12.463z"
                                        fill="#FA3746"
                                        data-reactid="389"
                                    ></path>
                                    <path
                                        d="M10.435 7.538c-.29.308-.462.786-.462 1.405v22.116c0 .62.172 1.097.462 1.405l.074.072 12.39-12.389v-.293L10.509 7.465l-.074.073z"
                                        fill="#06D2FF"
                                        data-reactid="390"
                                    ></path>
                                    <path
                                        d="M10.435 7.538l12.464 12.463 4.223-4.224-14.608-8.3c-.402-.229-.783-.337-1.121-.337a1.28 1.28 0 0 0-.958.398z"
                                        fill="#0EF076"
                                        data-reactid="391"
                                    ></path>
                                    <g data-reactid="392">
                                        <path
                                            d="M27.029 24.132l-14.515 8.247c-.812.462-1.538.43-2.004.01l-.074.076.074.072v-.001c.466.42 1.192.45 2.004-.011l14.608-8.3-.093-.093z"
                                            fill="#000"
                                            data-reactid="393"
                                        ></path>
                                        <path
                                            d="M10.435 32.318c-.29-.308-.463-.786-.463-1.405v.146c0 .62.172 1.097.463 1.405l.075-.074-.075-.072zM32.015 21.299l-4.986 2.833.093.093 4.893-2.78c.699-.397 1.048-.92 1.048-1.443-.06.473-.414.937-1.048 1.297"
                                            fill="#000"
                                            data-reactid="394"
                                        ></path>
                                        <path
                                            d="M12.514 7.623l19.5 11.08c.634.36.99.824 1.048 1.298.002-.523-.348-1.047-1.047-1.444L12.512 7.477c-1.398-.794-2.54-.135-2.54 1.466v.146c0-1.6 1.142-2.26 2.54-1.466"
                                            fill="#FFF"
                                            data-reactid="395"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className="w-full py-12">
                        <picture></picture>
                    </div>
                </div>
            </div>
            {/* What is billpop */}
            <section className="px-4 md:px-0 w-full md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 my-32">
                <div className="space-y-6 my-auto order-1 md:order-0">
                    <h3 className="font-bold text-3xl tracking-wide">What is Billpop</h3>
                    <p>
                        Depop is the fashion marketplace app where the next generation come to discover unique items.
                        With a global community buying, selling and connecting to make fashion more inclusive, diverse
                        and less wasteful. This is what transforming fashion looks like.
                    </p>
                    <button className="bg-black text-white px-8 py-2 font-bold">Get started</button>
                </div>
                <div className="hidden md:block w-full flex md:justify-end order-0 md:order-1">
                    <img
                        className="absolute"
                        style={{ width: '400px', height: '500px' }}
                        src="https://d3170a3msf25m.cloudfront.net/assets/home-phones-2@2x.jpg"
                        alt=""
                    />
                    {randomImage === 1 ? (
                        <img
                            className="relative top-3"
                            style={{ width: '219px', left: '-0.9rem' }}
                            src="https://d3170a3msf25m.cloudfront.net/assets/gallery-1.png"
                            alt=""
                        />
                    ) : (
                        <img
                            className="relative top-3"
                            style={{ width: '219px', left: '-0.9rem' }}
                            src="https://d3170a3msf25m.cloudfront.net/assets/gallery-1.png"
                            alt=""
                        />
                    )}
                </div>
            </section>

            <section className="px-4 md:px-0 w-full md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 my-24">
                <div className="">
                    <img
                        style={{ width: '400px', height: '500px' }}
                        src="https://d3170a3msf25m.cloudfront.net/assets/narrative/homepage-narrative-buyer@2x.jpg"
                        alt=""
                    />
                </div>
                <div className="flex items-center justify-center">
                    <div className="space-y-6">
                        <h3 className="font-bold text-3xl tracking-wide">Find your style</h3>
                        <p>
                            Shop the biggest brands you know and love. Discover independent brands making waves and the
                            creators behind them. Whatever you're into, find the item and the seller for you on Depop.
                        </p>
                        <button className="bg-black text-white px-8 py-2 font-bold">Shop now</button>
                    </div>
                </div>
            </section>

            <section className="px-4 md:px-0 w-full md:max-w-6xl mx-auto my-24">
                <h3 className="font-bold text-3xl tracking-wide">Things we love</h3>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    <div className="h-full w-full">
                        <img
                            src="https://d2h1pu99sxkfvn.cloudfront.net/b0/10762909/710872248_92f14dea3a324e6fb9cf8bad65152ca7/P8.jpg"
                            alt=""
                        />
                        <p className="text-sm font-semibold">£35.00</p>
                    </div>
                    <div className="h-full w-full">
                        <img
                            src="https://d2h1pu99sxkfvn.cloudfront.net/b0/10762909/710872248_92f14dea3a324e6fb9cf8bad65152ca7/P8.jpg"
                            alt=""
                        />
                        <p className="text-sm font-semibold">£35.00</p>
                    </div>
                    <div className="h-full w-full">
                        <img
                            src="https://d2h1pu99sxkfvn.cloudfront.net/b0/10762909/710872248_92f14dea3a324e6fb9cf8bad65152ca7/P8.jpg"
                            alt=""
                        />
                        <p className="text-sm font-semibold">£35.00</p>
                    </div>
                    <div className="h-full w-full">
                        <img
                            src="https://d2h1pu99sxkfvn.cloudfront.net/b0/10762909/710872248_92f14dea3a324e6fb9cf8bad65152ca7/P8.jpg"
                            alt=""
                        />
                        <p className="text-sm font-semibold">£35.00</p>
                    </div>
                    <div className="h-full w-full">
                        <img
                            src="https://d2h1pu99sxkfvn.cloudfront.net/b0/10762909/710872248_92f14dea3a324e6fb9cf8bad65152ca7/P8.jpg"
                            alt=""
                        />
                        <p className="text-sm font-semibold">£35.00</p>
                    </div>
                    <div className="h-full w-full">
                        <img
                            src="https://d2h1pu99sxkfvn.cloudfront.net/b0/10762909/710872248_92f14dea3a324e6fb9cf8bad65152ca7/P8.jpg"
                            alt=""
                        />
                        <p className="text-sm font-semibold">£35.00</p>
                    </div>
                    <div className="h-full w-full">
                        <img
                            src="https://d2h1pu99sxkfvn.cloudfront.net/b0/10762909/710872248_92f14dea3a324e6fb9cf8bad65152ca7/P8.jpg"
                            alt=""
                        />
                        <p className="text-sm font-semibold">£35.00</p>
                    </div>
                    <div className="h-full w-full">
                        <img
                            src="https://d2h1pu99sxkfvn.cloudfront.net/b0/10762909/710872248_92f14dea3a324e6fb9cf8bad65152ca7/P8.jpg"
                            alt=""
                        />
                        <p className="text-sm font-semibold">£35.00</p>
                    </div>
                    <div className="h-full w-full">
                        <img
                            src="https://d2h1pu99sxkfvn.cloudfront.net/b0/10762909/710872248_92f14dea3a324e6fb9cf8bad65152ca7/P8.jpg"
                            alt=""
                        />
                        <p className="text-sm font-semibold">£35.00</p>
                    </div>
                    <div className="h-full w-full">
                        <img
                            src="https://d2h1pu99sxkfvn.cloudfront.net/b0/10762909/710872248_92f14dea3a324e6fb9cf8bad65152ca7/P8.jpg"
                            alt=""
                        />
                        <p className="text-sm font-semibold">£35.00</p>
                    </div>
                    <div className="h-full w-full">
                        <img
                            src="https://d2h1pu99sxkfvn.cloudfront.net/b0/10762909/710872248_92f14dea3a324e6fb9cf8bad65152ca7/P8.jpg"
                            alt=""
                        />
                        <p className="text-sm font-semibold">£35.00</p>
                    </div>
                    <div className="h-full w-full">
                        <img
                            src="https://d2h1pu99sxkfvn.cloudfront.net/b0/10762909/710872248_92f14dea3a324e6fb9cf8bad65152ca7/P8.jpg"
                            alt=""
                        />
                        <p className="text-sm font-semibold">£35.00</p>
                    </div>
                </div>
            </section>

            <section className="px-4 md:px-0 w-full md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 my-32">
                <div className="space-y-6 my-auto order-1 md:order-0">
                    <h3 className="font-bold text-3xl tracking-wide">Sell your way</h3>
                    <p>
                        Sell a few items or build your empire. Whatever your vibe we’ll share our pro tips to help you
                        get there. It's simple to get started.
                    </p>
                    <button className="bg-black text-white px-8 py-2 font-bold">Sell on Billpop</button>
                </div>
                <div className="w-full flex order-0 md:order-1 md:justify-end">
                    <img
                        style={{ width: '400px', height: '500px' }}
                        src="https://d3170a3msf25m.cloudfront.net/assets/narrative/homepage-narrative-seller@2x.jpg"
                        alt=""
                    />
                </div>
            </section>

            <section className="px-4 md:px-0 w-full md:max-w-6xl mx-auto mb-20 md:mb-48">
                <h3 className="font-bold text-3xl tracking-wide">Meet sellers</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="w-full h-full">
                        <img src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg" alt="" />
                        <p className="font-semibold text-sm">@JEFFSOCOOL</p>
                    </div>
                    <div className="w-full h-full">
                        <img src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg" alt="" />
                        <p className="font-semibold text-sm">@JOSHWOW</p>
                    </div>
                    <div className="w-full h-full">
                        <img src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg" alt="" />
                        <p className="font-semibold text-sm">@JASPIEEE</p>
                    </div>
                    <div className="w-full h-full">
                        <img src="https://d3170a3msf25m.cloudfront.net/assets/narrative/sellers/sadsac.jpg" alt="" />
                        <p className="font-semibold text-sm">@SAMMIEBOY</p>
                    </div>
                </div>
            </section>

            <section className="w-full md:max-w-3xl lg:max-w-6xl mx-auto mb-48">
                <h3 className="font-semibold text-2xl text-center">
                    Be part of the community that's transforming fashion one item at a time.
                </h3>
            </section>

            <Footer />
        </div>
    )
}
