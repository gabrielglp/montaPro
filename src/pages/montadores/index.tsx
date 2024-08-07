import { useState, useEffect, ChangeEvent, FormEvent } from "react"

import { axiosInstance } from "../../services/api"
import { toast } from "react-toastify"

import NavBar from "@/components/NavBar";
import Head from "next/head"

import Office from "../../../public/pasta.png";
import Location from "../../../public/localizacao.png";
import Phone from "../../../public/telefone.png";
import Search from "../../../public/procurar2.png"
import Default from "../../../public/default.jpg"
import WhatsApp from "../../../public/whatsapp.png"
import Erro from "../../../public/erro.png"
import Image from "next/image";

import Link from "next/link";

interface County {
    id: string;
    name: string;
  }

interface Freela {
    id: string;
    name: string;
    phoneNumber: string;
    description: string;
    banner: string;
    county: County;
}

export default function dashBoard() {
    const [freelas, setFreelas] = useState<Freela[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchFreelas() {
            const apiClient = axiosInstance;
            try {
                const response = await apiClient.get('/freelas');
                setFreelas(response.data);
            } catch (error) {
                toast.error('Erro ao buscar freelas');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchFreelas();
    }, []);

    return (
        <>
        <Head>
            <title>Montadores - MontaPro</title>
        </Head>

        <main className="">
            <NavBar/>
            <div className="mt-8 flex justify-center items-center flex-col">
                <div className="bg-white flex rounded-full pr-4 md:pr-20 pl-2 py-2 mb-10">
                    <input className="px-4 mr-4 w-11/12 md:w-[36rem] bg-gray-050 flex rounded-full" placeholder="Digite o seu Munícipio"/>
                    <button className="rounded-3xl">
                        <Image className="w-10"  src={Search} alt=""/>
                    </button>
                </div>

                {loading ? (
                        <p className="text-gray-700 text-lg">Carregando...</p>
                    ) : freelas.length === 0 ? (
                        <Image className="w-11/12 md:max-w-md rounded-lg animate__animated animate__headShake delay-300" src={Erro} alt="" />
                    ) : (
                        freelas.map(freela => (
                            <div key={freela.id} className="flex justify-between mb-4 p-4 md:p-6 bg-white text-gray-700 w-11/12 md:w-[45rem] items-center rounded-3xl">
                                <div className="flex items-center">
                                    <div className="mr-4">
                                        <Image className="w-14 md:w-20 h-14 md:h-20 rounded-full bg-cover bg-center bg-no-repeat" src={Default} alt="" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm md:text-xl font-bold">{freela.name}</p>
                                        <p className="text-sm md:text-sm flex mt-4 items-center font-medium"><Image className="mr-2 w-4 h-4" src={Phone} alt="" />{freela.phoneNumber}</p>
                                        <p className="text-sm md:text-sm flex items-center font-medium"><Image className="mr-2 w-4 h-4" src={Location} alt="" />{freela.county.name}</p>
                                    </div>
                                </div>
                                <Link href={`https://api.whatsapp.com/send/?phone=${freela.phoneNumber}&text=Olá,%20tudo%20bem?&type=phone_number&app_absent=0`}>
                                    <Image className="w-14 md:w-20 h-14 md:h-20" src={WhatsApp} alt="" />
                                </Link>
                            </div>
                        ))
                    )}
                
            </div>
        </main>
        </>

    )
}

export { dashBoard };