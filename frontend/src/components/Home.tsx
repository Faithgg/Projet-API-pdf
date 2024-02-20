import { Fragment, useEffect, useState } from 'react'
import MenuComponent from './Menu';

export default function Historique() {
    const [pdfs,setPdfs] = useState([])

    
    async function goDelete(e:any,id:number){
        e.preventDefault()
        const response = await fetch(
            `http://localhost:3000/${id}`, { method: 'DELETE' }
          );

          const res = await response.json();

          console.log(res);
          
          if (res.succes===true) {
            const newRes = pdfs.filter((element:any)=>element.id !==id)
            setPdfs(newRes)
            return
          }

    }

    const getHistorique = async ()=>{
        try {
            const response = await fetch(
              "http://localhost:3000/"
            );
            const res = await response.json();

            const res2 = res.map(((element:any)=>({
              ...element, imageUrl: "https://cdn.pixabay.com/photo/2020/03/10/17/02/pdf-4919559_1280.png"
            })))
            setPdfs(res2)
            
          } catch (error:any) {
            console.error(error);
          }
    }   
    
    useEffect(()=>{
getHistorique()
    },[])

    
    if (pdfs.length===0) {
            return (
                <>
                <MenuComponent/>
            <div className="bg-white">
                <div className="mx-auto max-w-7xl  sm:px-6 sm:py-6 lg:px-8">
                <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Liste des pdfs générés à ce jour.</h3>
          </div>
                <ul role="list" className="divide-y divide-gray-100">
                <li key={"zedzdzede"} className="flex justify-between gap-x-6 py-5">
                    NOTHING
                </li>
                </ul>
                </div>
                </div>
                </>
                
            )
    } else {
        return (
            <>
            <MenuComponent/>
            <div className="bg-white">
            <div className="mx-auto max-w-7xl  sm:px-6 sm:py-6 lg:px-8">
            <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Liste des pdfs générés à ce jour.</h3>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {pdfs.map((pdf:any) => (
              <li key={pdf.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={pdf.imageUrl} alt="" />
                  <div className="min-w-0 flex-auto">

                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{`${pdf.name }`}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">Généré le :{`${ pdf.created_at }/20`}</p>

                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">                  
                        <button
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={(e)=>goDelete(e,pdf.id)}
                        >
                            Supprimer
                        </button>

                
                </div>
              </li>
            ))}
          </ul>
          </div>
          </div>
          </>
        )
    }
    
  }
  